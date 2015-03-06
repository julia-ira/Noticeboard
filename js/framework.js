(function () {

    function Framework() {

        /*Load header and footer templates*/
        this.init = function () {
            jQuery('#header').load('/templates/header.tmpl', function () {
                var index = $(location).attr('pathname').split("/", 2)[1];
                if (index === "" || index === "index" || index === "index.html") {
                    /*Load categories in header*/
                    var categories = getAllCategories();
                    categories.forEach(function (category) {
                        $("#categories").append("<option value='" + category.category_id + "'>" + category.name + "</option>");
                    });
                } else {
                    $("#categories").remove();
                }
                var userInfo = isLoggedIn();
                if (userInfo.user_id !== -1) {
                    $("#dLogout").append(userInfo.login + " <i class='fa fa-caret-down'></i>");
                    $(".dropdown-guest").addClass("hidden");
                    $(".dropdown-user").removeClass("hidden");
                    if (userInfo.role == 2) {
                        $("#user-menu").append("<li role='presentation' class='dropdown-header'>Адміністрування</li><li role='presentation'><a role='menuitem' href='adverts'>Оголошень</a></li><li role='presentation'><a role='menuitem' href='users'>Користувачів</a></li><li role='presentation' class='divider'></li>");
                    }
                    $("#user-menu").append("<li role='presentation'><a role='menuitem'' href='myads'>Мої оголошення</a></li><li role='presentation'><a role='menuitem' href='settings'>Налаштування</a></li><li role='presentation' class='divider'></li><li role='presentation'><a role='menuitem' href='/php/logout.php'>Вийти</a></li>");
                } else {
                    $(".dropdown-user").addClass("hidden");
                    $(".dropdown-guest").removeClass("hidden");
                    $("#dLogout").empty();
                }
            });
            jQuery('#footer').load('/templates/footer.tmpl');
        };

        /*-----Methods to make ajax requests-----*/
        getAllCategories = function () {
            var categories;
            $.ajax({
                url: "/php/getCategories.php",
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        categories = -1;
                    } else {
                        categories = data.data;
                    }
                },
                error: function () {}
            });
            return categories;
        };
        getAdvertsByCategoryAndPage = function (id, page) {
            var adverts;
            $.ajax({
                url: "/php/getAdvertsByCategory.php?category=" + id + "&page=" + page,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        adverts = -1;
                    } else {
                        adverts = data;
                    }
                },
                error: function () {}
            });
            return adverts;
        };
        getAllAdvertsByPage = function (page) {
            var adverts;
            $.ajax({
                url: "/php/getAdvertsByPage.php?page=" + page,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        adverts = -1;
                    } else {
                        adverts = data;
                    }
                },
                error: function () {}
            });
            return adverts;
        };
        getAdvertsByUser = function () {
            var adverts;
            $.ajax({
                url: "/php/getUserAdverts.php",
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        adverts = -1;
                    } else {
                        adverts = data.data;
                    }
                },
                error: function () {}
            });
            return adverts;
        }
        getAdvertByAdvertId = function (id) {
            var advert;
            $.ajax({
                url: "/php/getAdvertById.php?advert_id=" + id,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data[0] === "undefined") {
                        advert = -1;
                    } else {
                        advert = data.data[0];
                    }
                },
                error: function () {}
            });
            return advert;
        };
        getUsernameByUserId = function (id) {
            var nickname = "";
            $.ajax({
                url: "/php/getUserById.php?user_id=" + id,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data[0] === "undefined") {
                        nickname = "unknown";
                    } else {
                        nickname = data.data[0].login;
                    }
                },
                error: function () {}
            });
            return nickname;
        };
        getAllUsers = function () {
            var users;
            $.ajax({
                url: "/php/getAllUsers.php",
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data[0] === "undefined") {
                        users = -1;
                    } else {
                        users = data.data;
                    }
                },
                error: function () {}
            });
            return users;
        };
        getUserByUserId = function (id) {
            var user;
            $.ajax({
                url: "/php/getUserById.php?user_id=" + id,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data[0] === "undefined") {
                        user = -1;
                    } else {
                        user = data.data[0];
                    }
                },
                error: function () {}
            });
            return user;
        };
        getAllCommentsByAdvertIdAndPage = function (id, page) {
            var comments;
            $.ajax({
                url: "/php/getCommentsToAdvert.php?advert_id=" + id + "&page=" + page,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        comments = -1;
                    } else {
                        comments = data;
                    }
                },
                error: function () {}
            });
            return comments;
        };
        getSearchResults = function (type, value) {
            var adverts;
            $.ajax({
                url: "/php/search.php?type=" + type + "&search=" + value,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        adverts = -1;
                    } else {
                        adverts = data.data;
                    }
                },
                error: function () {}
            });
            return adverts;
        };
        getUserRequests = function () {
            var requests;
            $.ajax({
                url: "/php/getRequests.php",
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (typeof data.data === "undefined") {
                        requests = -1;
                    } else {
                        requests = data.data;
                    }
                },
                error: function () {}
            });
            return requests;
        };
        isLoggedIn = function () {
            var userInfo;
            $.ajax({
                url: '/php/isLogged.php',
                dataType: 'json',
                async: false,
                success: function (data) {
                    userInfo = data.data;
                },
                error: function () {}
            });
            return userInfo;
        };
        deleteAdvertById = function (id) {
            var formData = new FormData();
            formData.append('advert_id', id);
            $.ajax({
                type: 'POST',
                url: '/php/deleteAdvertById.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                complete: function () {
                    if ($("#user-ads")) {
                        window.framework.loadUserAdverts();
                    }
                    if ($("#admin-user-ads")) {
                        window.framework.loadAllAdverts();
                    }
                }
            });
        };
        deleteUserById = function (id) {
            var formData = new FormData();
            formData.append('user_id', id);
            $.ajax({
                type: 'POST',
                url: '/php/deleteUserById.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                complete: function () {
                    window.framework.loadUsers();
                }
            });
        };
        deleteCommentById = function (commentId, advertId) {
            var formData = new FormData();
            formData.append('comment_id', commentId);
            $.ajax({
                type: 'POST',
                url: '/php/deleteCommentById.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                success: function (data) {
                    var comments = getAllCommentsByAdvertIdAndPage(advertId, 0);
                    comments.added = true;
                    displayCommentsOnAdvertPage(comments, advertId);
                }
            });
        };
        acceptUserRequest = function (id) {
            var formData = new FormData();
            formData.append('request_id', id);
            $.ajax({
                type: 'POST',
                url: '/php/acceptRequest.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                complete: function () {
                    window.framework.loadRequests();
                }
            });
        };
        declineUserRequest = function (id) {
            var formData = new FormData();
            formData.append('request_id', id);
            $.ajax({
                type: 'POST',
                url: '/php/rejectRequest.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                complete: function () {
                    window.framework.loadRequests();
                }
            });
        };
        changeUserRole = function (userId, roleId) {

        };


        /*-----Methods to add data-----*/

        /* Add comment on advert page */
        this.addComment = function (id, form) {
            var formData = new FormData();
            formData.append('advert_id', id);
            formData.append('text', form.elements["text"].value);
            form.elements['text'].value = "";
            $.ajax({
                type: 'POST',
                url: '/php/addComment.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                complete: function () {
                    var data = getAllCommentsByAdvertIdAndPage(id, 0);
                    data.added = true;
                    displayCommentsOnAdvertPage(data, id);
                }
            });
            return true;
        };
        /*Change password*/
        this.changePassword = function (form) {
            var formData = new FormData();
            formData.append('oldPassword', form.elements["current-pass"].value);
            formData.append('newPassword', form.elements["new-pass"].value);
            $.ajax({
                type: 'POST',
                url: '/php/changePassword.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                success: function (data) {
                    $("#change-pass-alert").html("<div class='alert alert-warning'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + data.data + "</div>");
                },
                error: function () {}
            });
            return true;
        }
        /*Send request to administrator*/
        this.sendAdminRequest = function (form) {
            var formData = new FormData();
            formData.append('user-surname', form.elements["user-surname"].value);
            formData.append('user-role', $("#user-role").find(":selected").val());
            $.ajax({
                type: 'POST',
                url: '/php/requestRole.php',
                data: formData,
                cache: false,
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                complete: function () {
                    $("#send-request-alert").html("<div class='alert alert-warning'><a href='#' class='close' data-dismiss='alert'>&times;</a>Заявка успішно надіслана!</div>");
                },
                error: function () {}
            });
            return true;
        };

        /*-----Methods to create HTML markup-----*/

        /* Build HTML marckup to display advert on main page*/
        displayAdvertOnIndexPage = function (advert) {
            var rgb = ['255, 196, 0, 0.5', '255, 0, 0, 0.5', '0, 255, 0, 0.5', '0, 245, 255, 0.5', '196, 0, 255, 0.5', '255, 0, 186, 0.5']; //Color codes
            var column = document.createElement("div");
            column.className = "col-xs-12 col-sm-6 col-md-3 col-lg-2";
            var block = document.createElement("div");
            block.className = "block";
            var title = document.createElement("h3");
            title.className = "title";
            var aTitle = document.createElement("a");
            aTitle.href = "/advert/" + advert.advert_id + "/";
            aTitle.innerHTML = advert.title;
            var readMore = document.createElement("a");
            readMore.href = aTitle.href;
            readMore.className = "read-more";
            var readMoreText = document.createTextNode("Детальніше");
            title.appendChild(aTitle);
            readMore.appendChild(readMoreText);
            if (advert.image === "") {
                var paragraph = document.createElement("p");
                paragraph.className = "small-text";
                var txt = $("<p/>").html(advert.text).text().replace(/(<([^>]+)>)/ig, " ").replace(/&nbsp;/g, " ");
                if (txt.length > 300) {
                    txt = txt.substring(0, 300) + "...";
                }
                var pText = document.createTextNode(txt + " ");
                var shareInfo = document.createElement("span");
                shareInfo.className = "share-info";
                var date = document.createElement("span");
                date.className = "date";
                date.innerHTML = advert.date.substring(8, 10) + "-" + advert.date.substring(5, 7) + "-" + advert.date.substring(0, 4);
                var comments = document.createElement("span");
                comments.className = "comments";
                comments.innerHTML = " " + advert.comments + " COMMENTS ";
                var rndnum = Math.floor(Math.random() * (rgb.length - 1));
                block.style.backgroundColor = "rgba(" + rgb[rndnum] + ")";
                paragraph.appendChild(pText);
                paragraph.appendChild(readMore);
                shareInfo.appendChild(date);
                shareInfo.appendChild(comments);
                block.appendChild(title);
                block.appendChild(paragraph);
                block.appendChild(shareInfo);
                column.appendChild(block);
            } else {
                var titleBlock = document.createElement("div");
                titleBlock.className = "title-block hidden";
                block.style.background = "url(" + advert.image + ") center center no-repeat";
                block.style.backgroundSize = "cover";
                titleBlock.appendChild(title);
                titleBlock.appendChild(readMore);
                block.appendChild(titleBlock);
                column.appendChild(block);
            }
            return column;
        };

        /*Build HTML marckup to display advert on arvert.html*/
        displayAdvertOnAdvertPage = function (id) {
            var advert = getAdvertByAdvertId(id);
            $("title").append(advert.title);
            $(".title").append(advert.title);
            $(".adv-date").append(advert.date.substring(8, 10) + "/" + advert.date.substring(5, 7) + "/" + advert.date.substring(0, 4));
            $(".adv-author").append(getUsernameByUserId(advert.user_id).toUpperCase());
            $(".adv-comments").text("0 COMMENTS");
            var advText = $("<p/>").html(advert.text).text();
            $(".adv-text").html(advText);
            if (advert.tags !== "") {
                var tags = advert.tags.split(',');
                tags.forEach(function (tag) {
                    var aTag = document.createElement("a");
                    aTag.href = "search.html#" + tag;
                    aTag.innerHTML = "#" + tag + " ";
                    $(".adv-tags").append(aTag);
                });
            }
            if (advert.image === "") {
                $(".adv-tags").insertAfter(".adv-text");
                $(".adv-tags").addClass("tags-noimg");
                $(".col-md-3").remove();
                var advContent = $(".col-md-9").html();
                $(".col-md-9").remove();
                $("#full-advert").append(advContent);
            } else {
                var img = document.createElement("img");
                img.src = advert.image;
                img.alt = advert.image;
                img.className = "img-responsive";
                img.setAttribute("data-toggle", "lightbox");
                img.setAttribute("data-title", advert.title);
                img.setAttribute("data-remote", advert.image);
                $(".adv-img").append(img);
            }
        };

        /*Build HTML marckup to display comment on arvert.html*/
        displayCommentsOnAdvertPage = function (data, advertId) {
            $(".adv-comments").text(data.total + " COMMENTS");
            var comments = data.data;
            if (comments !== undefined) {
                if (data.added === true) {
                    $(".adv-comments-list").empty();
                }
                comments.forEach(function (c) {
                    var comment = document.createElement("div");
                    comment.id = c.comment_id;
                    var media = document.createElement("div");
                    media.className = "media";
                    var anch = document.createElement("a");
                    anch.href = "#";
                    anch.className = "pull-left";
                    var img = document.createElement("img");
                    img.className = "media-object img-circle";
                    img.alt = "user logo";
                    var user = getUserByUserId(c.user_id);
                    img.src = user.picture;
                    var commBody = document.createElement("div");
                    commBody.className = "media-body comment-content";
                    var commNick = document.createElement("h4");
                    commNick.className = "media-heading comment-nick";
                    var commDate = document.createElement("h4");
                    commDate.className = "comment-date";
                    var commText = document.createElement("p");
                    commText.className = "comment-text";
                    var nick = document.createTextNode(getUsernameByUserId(c.user_id));
                    var space = document.createTextNode(" ");
                    var date = document.createTextNode(c.date.substring(0, 16));
                    var text = document.createTextNode(c.comment_text);
                    anch.appendChild(img);
                    commNick.appendChild(nick);
                    commDate.appendChild(date);
                    commText.appendChild(text);
                    commBody.appendChild(commNick);
                    commBody.appendChild(space);
                    commBody.appendChild(space);
                    commBody.appendChild(space);
                    commBody.appendChild(commDate);
                    var info = isLoggedIn();
                    if (info.role === "2") {
                        var commRemove = document.createElement("h4");
                        commRemove.className = "comment-remove";
                        commRemove.onclick = function () {
                            deleteCommentById(c.comment_id, advertId);
                        };
                        var rmIcon = document.createElement("i");
                        rmIcon.className = "fa fa-times";
                        commRemove.appendChild(rmIcon);
                        commBody.appendChild(commRemove);
                    }
                    commBody.appendChild(commText);
                    media.appendChild(anch);
                    media.appendChild(commBody);
                    comment.appendChild(media);
                    $(".adv-comments-list").append(comment);
                });
            }
        };

        /*Display advert on search.html*/
        displaySearchResult = function (advert) {
            var image;
            if (advert.image !== "") {
                image = $('<div>', {
                    'class': 'col-md-3 search-result-img'
                }).css("background-image", "url(" + advert.image + ")");
            } else {
                image = $('<div>', {
                    'class': 'col-md-3'
                });
            }
            var tags = $('<p>', {
                'class': 'search-tags'
            }).append($('<i>', {
                'class': 'fa fa-tags fa-lg'
            }));
            if (advert.tags === "") {
                tags.append(" ");
            } else {
                var t = advert.tags.split(',');
                t.forEach(function (tag) {
                    tags.append(" ").append($('<a>', {
                        href: 'search.html',
                        text: '#' + tag
                    }));
                });
            }
            var txt = $("<p/>").html(advert.text).text().replace(/(<([^>]+)>)/ig, " ").replace(/&nbsp;/g, " ");
            if (txt.length > 350) {
                txt = txt.substring(0, 350) + "...";
            }
            var info = $('<div>', {
                'class': 'col-md-9 search-result-info'
            }).append($('<h3>', {
                'class': 'search-title'
            }).append($('<a>', {
                href: '/advert/' + advert.advert_id + "/",
                text: advert.title
            }))).append($('<p>', {
                'class': 'search-text',
                text: txt
            })).append(tags);
            var resultBlock = $('<div>', {
                'class': 'row search-result-block'
            }).append(image).append(info);
            $("#search-results").append(resultBlock);
        };

        /*Display user adverts in myads.html*/
        displayUserAdverts = function (advert) {
            var userAd = $('<div>', {
                'class': 'row user-ad'
            });
            var date = $('<div>', {
                'class': 'col-md-2'
            }).append($('<p>', {
                text: advert.date.substring(8, 10) + "-" + advert.date.substring(5, 7) + "-" + advert.date.substring(0, 4)
            }));
            var title = $('<div>', {
                'class': 'col-md-8'
            }).append($('<p>').append($('<a>', {
                href: '/advert/' + advert.advert_id + "/",
                text: advert.title
            })));
            var edit = $('<div>', {
                'class': 'col-md-2'
            }).append($('<button>', {
                'class': 'btn btn-primary btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                $("#edit-advert-id").attr('value', advert.advert_id);
                $("#edit-title").attr('value', advert.title);
                var wysihtml5Editor = $('#edit-text').data("wysihtml5").editor;
                wysihtml5Editor.setValue($("<p/>").html(advert.text).text(), true);
                $('#add-category option[value="' + advert.category_id + '"]').attr('selected', true);
                if (advert.image != "") {
                    if (!($("#edit-advert-image").length > 0)) {
                        $(".edit-col-input").before("<div class='col-sm-2 edit-col-img'><img src='' alt='avatar' class='img-circle' id='edit-advert-image'></div>");
                    }
                    $("#edit-advert-image").attr("src", advert.image);
                } else {
                    $(".edit-col-img").remove();
                }
                var tags = advert.tags.split(",");
                tags.forEach(function (tag) {
                    $("#edit-tags").tagsinput('add', tag);
                });
                $('#edit-modal').modal('show');
            }).html("<span class='glyphicon glyphicon-pencil'>")).append(" ").append($('<button>', {
                'class': 'btn btn-danger btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                $('#delete-modal').data('id', advert.advert_id).modal('show');
            }).html("<span class='glyphicon glyphicon-trash'></span>"));
            userAd.append(date).append(title).append(edit);
            $("#user-ads").append(userAd);
        };

        /*Display all adverts for administrator in adverts.html*/
        displayAdvertsForAdmin = function (advert) {
            var userAd = $('<div>', {
                'class': 'row user-ad'
            });
            var date = $('<div>', {
                'class': 'col-md-2'
            }).append($('<p>', {
                text: advert.date.substring(8, 10) + "-" + advert.date.substring(5, 7) + "-" + advert.date.substring(0, 4)
            }));
            var title = $('<div>', {
                'class': 'col-md-8'
            }).append($('<p>').append($('<a>', {
                href: '/advert/' + advert.advert_id + "/",
                text: advert.title
            })));
            var edit = $('<div>', {
                'class': 'col-md-2'
            }).append($('<button>', {
                'class': 'btn btn-danger btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                $('#delete-modal').data('id', advert.advert_id).modal('show');
            }).html("<span class='glyphicon glyphicon-trash'></span>"));
            userAd.append(date).append(title).append(edit);
            $("#admin-user-ads").append(userAd);
        };

        /*Display all users for administrator in users.html*/
        displayUsersForAdmin = function (user) {
            var row = $('<tr>', {
                id: user.user_id
            });
            var td1 = $('<td>').append("<img alt='" + user.login + "' src='" + user.picture + "' class='img-circle' id='table-img'>");
            var td2 = $('<td>', {
                text: user.login
            });
            var td3 = $('<td>', {
                text: user.email
            });
            var td4 = $('<td>', {
                text: user.role
            }).append("<input type='hidden' value='" + user.role_id + "'>");
            var td5 = $('<td>').append($('<button>', {
                'class': 'btn btn-primary btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                $('#edit-user-role option[value="' + user.role_id + '"]').attr('selected', true);
                $('#edit-user-modal').data('id', user.user_id).modal('show');
            }).html("<span class='glyphicon glyphicon-pencil'></span>")).append(" ").append($('<button>', {
                'class': 'btn btn-danger btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                $('#delete-modal').data('id', user.user_id).modal('show');
            }).html("<span class='glyphicon glyphicon-trash'></span>"));
            row.append(td1).append(td2).append(td3).append(td4).append(td5);
            $('#users-table > tbody:last').append(row);
        };

        /*Display user requests for administrator*/
        displayUserRequests = function (request) {
            var row = $('<tr>', {
                id: request.request_id
            });
            var user = getUserByUserId(request.user_id);
            var td1 = $('<td>').append("<img alt='" + user.login + "' src='" + user.picture + "' class='img-circle' id='table-img'>");
            var td2 = $('<td>', {
                text: user.login
            });
            var td3 = $('<td>', {
                text: request.fullname
            });
            var td4 = $('<td>', {
                text: request.request_role_id
            });
            var td5 = $('<td>').append($('<button>', {
                'class': 'btn btn-primary btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                acceptUserRequest(request.request_id);
            }).html("<span class='glyphicon glyphicon-ok-sign'></span> Так")).append(" ").append($('<button>', {
                'class': 'btn btn-danger btn-xs',
                type: "button"
            }).click(function (e) {
                e.preventDefault();
                declineUserRequest(request.request_id);
            }).html("<span class='glyphicon glyphicon-remove'></span> Ні"));
            row.append(td1).append(td2).append(td3).append(td4).append(td5);
            $('#users-notification-table > tbody:last').append(row);
        };

        /*-----Methods to perform tasks-----*/

        /*Load categories in add.html and myads.html*/
        this.loadCategoriesInAddPage = function () {
            var categories = getAllCategories();
            categories.forEach(function (category) {
                var selectOption = document.createElement("option");
                var optionText = document.createTextNode(category.name);
                selectOption.value = category.category_id;
                selectOption.appendChild(optionText);
                $("#add-category").append(selectOption);
            });
        };

        /*Load user data in settings.html*/
        this.loadUserSettings = function () {
            var userInfo = isLoggedIn();
            var user = getUserByUserId(userInfo.user_id);
            $("#change-avatar").attr("src", user.picture);
            $("#change-login").attr("placeholder", user.login);
            $("#change-email").attr("placeholder", user.email);
        };

        /*Load adverts in myads.html*/
        this.loadUserAdverts = function () {
            $("#user-ads").empty();
            var adverts = getAdvertsByUser();
            if (adverts !== null) {
                adverts.reverse().forEach(function (advert) {
                    displayUserAdverts(advert);
                });
            }
        };

        /*Load users in users.html*/
        this.loadUsers = function () {
            $("#users-table tbody").empty();
            var users = getAllUsers();
            users.forEach(function (user) {
                displayUsersForAdmin(user);
            });
        };

        /*Load requests in users.html*/
        this.loadRequests = function () {
            $("#users-notification-table tbody").empty();
            var requests = getUserRequests();
            requests.forEach(function (request) {
                displayUserRequests(request);
            });
        };

        /*Load adverts in adverts.html*/
        this.loadAllAdverts = function () {
            $("#admin-user-ads").empty();
            var data = getAllAdvertsByPage(0);
            for (i = 0; i < data.pages; i++) {
                var adverts = getAllAdvertsByPage(i);
                adverts = adverts.data;
                adverts.forEach(function (advert) {
                    displayAdvertsForAdmin(advert);
                });
            }
        };

        /*Show all advertisements on main page*/
        this.showAllAdverts = function (page) {
            $(".fa-refresh").addClass("fa-spin");
            if (page === 0) {
                $(".loader").removeClass("hidden");
            }
            var data = getAllAdvertsByPage(page);
            if (page < data.pages) {
                var adverts = data.data;
                adverts.forEach(function (advert) {
                    $(".content-ads").append($(displayAdvertOnIndexPage(advert)));
                    $(".load-more").removeClass("hidden");
                    $(".fa-refresh").removeClass("fa-spin");
                    $(".loader").addClass("hidden");
                });
                if (page == data.pages - 1) {
                    $("#load-more").attr("disabled", "disabled");
                } else {
                    $("#load-more").removeAttr("disabled");
                }
            }
        };

        /*Show all advertisements by category*/
        this.showAllAdvertsByCategory = function (id, page) {
            $(".fa-refresh").addClass("fa-spin");
            var data = getAdvertsByCategoryAndPage(id, page);
            if (page < data.pages) {
                var adverts = data.data;
                adverts.forEach(function (advert) {
                    $(".content-ads").append($(displayAdvertOnIndexPage(advert)));
                    $(".load-more").removeClass("hidden");
                    $(".fa-refresh").removeClass("fa-spin");
                });
                if (page == data.pages - 1) {
                    $("#load-more").attr("disabled", "disabled");
                } else {
                    $("#load-more").removeAttr("disabled");
                }
            }
        };

        /*Show advert on seperate page arvert.html*/
        this.showFullAdvert = function (id) {
            displayAdvertOnAdvertPage(id);
            var data = getAllCommentsByAdvertIdAndPage(id, 0);
            displayCommentsOnAdvertPage(data, id);
            if (data.pages === 1 || data.pages === 0) {
                $("#load-more").attr("disabled", "disabled");
            }
            $(".loader").addClass("hidden");
            $(".load-more").removeClass("hidden");
            $(".adv-info").removeClass("hidden");
            $("#full-advert").removeClass("hidden");
        };

        /*Load more comments to the specific advert*/
        this.showAllComments = function (id, page) {
            $(".fa-refresh").addClass("fa-spin");
            var data = getAllCommentsByAdvertIdAndPage(id, page);
            if (page < data.pages) {
                displayCommentsOnAdvertPage(data, id);
            }
            if (page == data.pages - 1) {
                $("#load-more").attr("disabled", "disabled");
            }
            $(".fa-refresh").removeClass("fa-spin");
        };

        /*Search function*/
        this.findAdverts = function () {
            var adverts;
            var type = $('input[name=search]:checked', '#search-form').val();
            var keyWord = $("#search-field").val();
            if (type === "3") {
                adverts = getSearchResults("tags", keyWord);
            } else if (type === "2") {
                adverts = getSearchResults("keywords", keyWord);
            } else {
                adverts = getSearchResults("all", keyWord);
            }
            $(".search-number").empty();
            $("title").empty();
            $("title").append("Пошук: " + keyWord);
            $(".search-number").append("Кількість результатів: " + adverts.length);
            $("#search-results").empty();
            adverts.forEach(function (advert) {
                displaySearchResult(advert);
            });
            return false;
        };

        /*Pass search word from header to search.html*/
        this.saveSearchWords = function (form) {
            var f = form.elements[0].value;
            sessionStorage.setItem('search', f);
            window.location.replace("http://noticeboard.url.ph/search");
        };

        /*Delete specific advert in myads.html and adverts.html*/
        this.deleteSelectedAdvert = function (id) {
            deleteAdvertById(id);
        };

        /*Delete specific user in users.html*/
        this.deleteSelectedUser = function (id) {
            deleteUserById(id);
        };

        /*Edit user by administrator*/
        this.editSelectedUser = function (userId, roleId) {
            changeUserRole(userId, roleId);
        };


    }

    if (!window.framework) {
        window.framework = new Framework();
    }

    /* Document is ready */
    $(document).ready(function () {
        window.framework.init();
        if ($(".content-ads").length > 0) {
            window.framework.showAllAdverts(0);
            $(".content-ads").on('mouseover', ".block", function () {
                $(this).find(".title-block").removeClass("hidden");
            }).on('mouseout', ".block", function () {
                $(this).find(".title-block").addClass("hidden");
            });
        }
        if ($("#add-category") || $("user-ads")) {
            window.framework.loadCategoriesInAddPage();
        }
        if ($("#user-settings")) {
            window.framework.loadUserSettings();
        }
        if ($("#user-ads")) {
            window.framework.loadUserAdverts();
        }
        if ($("#admin-users")) {
            window.framework.loadUsers();
            window.framework.loadRequests();
        }
        if ($("#admin-user-ads")) {
            window.framework.loadAllAdverts();
        }
    });

})();