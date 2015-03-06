<?php
require_once 'config.php';
	/**
	 * 
	 */
	class Connection {
        private $connection;
		
		function __construct() {
			
		}
		
		public function connect()
		{
			$this->connection = mysql_connect ('localhost', 'u936235099_user', 'rehfuf', 'u936235099_board')
            or die ('Unable to connect!');
            mysql_select_db('u936235099_board') or die (mysql_error());
            mysql_query("set character_set_client='utf8'"); 
            mysql_query("set character_set_server='utf8'"); 
            mysql_query("set character_set_results='utf8'"); 
            mysql_query("set collation_connection='utf8_unicode_ci'");
            return $this->connection;
		}
        
        public function disconnect(){
            mysql_close($this->connection);
        }
	}
	
?>