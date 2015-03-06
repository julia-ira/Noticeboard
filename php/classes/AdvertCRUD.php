<?php
require_once 'Connection.php';
/**
 *
 */
class AdvertCRUD {
	private $adv_per_page = 12;
	private $comments_per_page = 10;

	function __construct() {
		$this -> connection = new Connection();
		$this -> connection -> connect();
	}

	function __destruct() {
		$this -> connection -> disconnect();
	}

	public function addAdvert($title, $text, $user_id, $category_id, $tags, $image) {
		$date = date("Y-m-d H:i:s");
		$query = "INSERT INTO adverts (title, text, user_id, category_id, image, tags, date) 
			VALUES ('$title', '$text', '$user_id', '$category_id', '$image', '$tags', '$date')";

		$result = mysql_query($query) or die(mysql_error());
		$data['uploaded'] = true;

		return data;
	}

	public function getAdvertById($advert_id) {
		$query = "SELECT * FROM adverts where adverts.advert_id='$advert_id';";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function getAdvertsByCategory($category_id, $page) {
		$position = ($page * $this -> adv_per_page);
		$query = "SELECT * FROM adverts where adverts.category_id='$category_id' ORDER BY adverts.advert_id DESC LIMIT $position, $this->adv_per_page;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
            $r = (object) array_merge((array)$r, array('comments' => count($this -> getCommentsToAdvert($r['advert_id']))));
			$rows[] = $r;
		}
		return $rows;
	}

	public function getAllAdvertsByCategory($category_id) {
		$query = "SELECT * FROM adverts where adverts.category_id='$category_id';";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function getAdvertsByPage($page) {
		$position = ($page * $this -> adv_per_page);
		$query = "SELECT * FROM adverts ORDER BY adverts.advert_id DESC LIMIT $position, $this->adv_per_page;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$r = (object) array_merge((array)$r, array('comments' => count($this -> getCommentsToAdvert($r['advert_id']))));
			$rows[] = $r;

		}
		return $rows;
	}

	public function getAllAdverts() {
		$query = "SELECT * FROM adverts ORDER BY adverts.advert_id DESC;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function getCategories() {
		$query = "SELECT category_id, name FROM categories";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function getCommentsToAdvert($advert_id) {
		$query = "SELECT * FROM comments where comments.advert_id='$advert_id' ORDER BY comments.comment_id DESC;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function getCommentsToAdvertByPage($advert_id, $page) {
		$position = ($page * $this -> comments_per_page);
		$query = "SELECT * FROM comments where comments.advert_id='$advert_id' ORDER BY comments.comment_id DESC LIMIT $position, $this->comments_per_page;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function getCommentsPagesNumber($advert_id) {
		$number = ceil(count($this -> getCommentsToAdvert($advert_id)) / $this -> comments_per_page);
		return $number;
	}

	public function addCommentToAdvert($advert_id, $text, $user_id) {
		$date = date("Y-m-d H:i:s");
		$query = "INSERT INTO comments (advert_id, comment_text, user_id, date) VALUES ('$advert_id', '$text', '$user_id', '$date')";
		$result = mysql_query($query) or die(mysql_error());
		return $result;
	}

	public function getPagesNumber() {
		$number = ceil(count($this -> getAllAdverts()) / $this -> adv_per_page);
		return $number;
	}

	public function getCategoryPagesNumber($category_id) {
		$number = ceil(count($this -> getAllAdvertsByCategory($category_id)) / $this -> adv_per_page);
		return $number;
	}

	public function searchByTags($tags) {
        $tags = mysql_real_escape_string($tags);
        $words = array();
        $words = explode(" ", $tags);
        for ($i=0;$i<count($words);$i++) {
            $words[$i]='*'.$words[$i].'*';
        }
        $tags = implode(" ", $words);
		$query = "SELECT *
		FROM adverts 
		WHERE MATCH (tags) AGAINST ('$tags' IN BOOLEAN MODE);";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}

	public function searchByKeywords($keywords) {
		$keywords = mysql_real_escape_string($keywords);
		$words = array();
        $words = explode(" ", $keywords);
        for ($i=0;$i<count($words);$i++) {
            $words[$i]='*'.$words[$i].'*';
        }
        $keywords = implode(" ", $words);
		$query = "SELECT *,
        MATCH (title, text) AGAINST ('$keywords' IN BOOLEAN MODE) AS relevance,
        MATCH (title) AGAINST ('$keywords' IN BOOLEAN MODE) AS title_relevance
		FROM adverts 
		WHERE MATCH (title, text) AGAINST ('$keywords' IN BOOLEAN MODE)
        ORDER BY title_relevance DESC, relevance DESC;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
	}
    
    public function searchByAll($keywords){
        $keywords = mysql_real_escape_string($keywords);
		$words = array();
        $words = explode(" ", $keywords);
        for ($i=0;$i<count($words);$i++) {
            $words[$i]='*'.$words[$i].'*';
        }
        $keywords = implode(" ", $words);
		$query = "SELECT *,
        MATCH (title, text, tags) AGAINST ('$keywords' IN BOOLEAN MODE) AS relevance_tags,
        MATCH (title, text) AGAINST ('$keywords' IN BOOLEAN MODE) AS relevance,
        MATCH (title) AGAINST ('$keywords' IN BOOLEAN MODE) AS title_relevance
		FROM adverts 
		WHERE MATCH (title, text, tags) AGAINST ('$keywords' IN BOOLEAN MODE)
        ORDER BY title_relevance DESC, relevance DESC, relevance_tags DESC;";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
    }
    
    public function getAdvertsByUser($user_id){
        $query = "SELECT * FROM adverts where adverts.user_id='$user_id';";
		$res = mysql_query($query) or die(mysql_error());
		$rows = array();
		while ($r = mysql_fetch_assoc($res)) {
			$rows[] = $r;
		}
		return $rows;
    }
    
    public function deleteAdvertById($advert_id){
        $advert = $this->getAdvertById($advert_id);
        
        if(is_readable(realpath("..".$advert[0]['image']))){
            unlink(realpath("..".$advert[0]['image']));
            echo "file ".realpath("..".$advert[0]['image'])." is deleted!";
        } else{
            echo "file ".realpath("..".$advert[0]['image'])." doesnt exist!";
        }
        
        //unlink($advert[0]['image']);
        $query = "DELETE FROM adverts where adverts.advert_id='$advert_id';";
		$res = mysql_query($query) or die(mysql_error());
		$data['deleted'] = true;
		return $data;
    }
    
    public function deleteCommentById($advert_id){
        $query = "DELETE FROM comments where comments.comment_id='$comment_id';";
		$res = mysql_query($query) or die(mysql_error());
		$data['deleted'] = true;
		return $data;
    }
}
?>