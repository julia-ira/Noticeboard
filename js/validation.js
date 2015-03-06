$(document).ready(function () {
    var pageToValidate = $(location).attr('pathname').split("/", 2)[1];
    switch (pageToValidate) {
    case 'add':
        var info = isLoggedIn();
        if (info.user_id === -1) {
            $("#add-submit").attr('disabled', 'disabled');
            $("#login-alert").html("<div class='alert alert-warning'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Увага!</strong> Увійдіть, щоб додати оголошення.</div>");
            $("#add-role-pzas").remove();
            $("#add-role-students").remove();
            $("#add-role-teachers").remove();
        } else {
            if (info.role === "1") {
                $("#add-role-pzas").remove();
                $("#add-role-students").remove();
                $("#add-role-teachers").remove();
            } else if (info.role === "3") {
                $("#add-role-teachers").remove();
            } else if (info.role === "4") {
                $("#add-role-students").remove();
            }
            if (info.status !== "1") {
                $("#add-submit").attr('disabled', 'disabled');
                $("#login-alert").html("<div class='alert alert-warning'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Увага!</strong> Вам необхідно підтвердити свій акаунт, щоб додавати оголошення.</div>");
            } else {
                $("#add-advert-form").bootstrapValidator({
                    live: 'disabled',
                    feedbackIcons: {
                        valid: "glyphicon glyphicon-ok",
                        invalid: "glyphicon glyphicon-remove",
                        validating: "glyphicon glyphicon-refresh"
                    },
                    fields: {
                        "add-title": {
                            validators: {
                                notEmpty: {
                                    message: "Заголовок оголошення обов'язковий"
                                },
                                stringLength: {
                                    min: 6,
                                    max: 70,
                                    message: "Заголовок повинен містити не менше 6 та не більше 70 символів"
                                },
                            }
                        },
                        "add-text": {
                            validators: {
                                notEmpty: {
                                    message: "Текст оголошення обов'язковий"
                                }
                            }
                        },
                        "add-category": {
                            validators: {
                                notEmpty: {
                                    message: "Оберіть категорію"
                                }
                            }
                        },
                        "add-image": {
                            validators: {
                                file: {
                                    extension: "jpeg,jpg,png",
                                    type: "image/jpeg,image/jpg,image/png",
                                    maxSize: 2048 * 1024, // 2 MB
                                    message: "Перевірте формат (jpeg/jpg/png) та розмір файлу"
                                }
                            }
                        }
                    },
                    submitHandler: function (validator, form, submitButton) {
                        form.get(0).submit();
                    }
                });
            }
        }
        break;
    case 'advert':
        var info = isLoggedIn();
        if (info.user_id === -1) {
            $("#comment-submit").attr('disabled', 'disabled');
            $("#login-alert").html("<div class='alert alert-warning'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Увага!</strong> Увійдіть, щоб додати коментар.</div>");
        } else {
            if (info.status !== "1") {
                $("#comment-submit").attr('disabled', 'disabled');
                $("#login-alert").html("<div class='alert alert-warning'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Увага!</strong> Вам необхідно підтвердити свій акаунт, щоб додавати коментарі.</div>");
            } else {
                $("#add-comment-form").bootstrapValidator();
            }
        }
        break;
    case 'forgot':
        $('#forgot-form').bootstrapValidator();
        break;
    case 'registration':
        $("#registration-form").bootstrapValidator({
            live: 'enabled',
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                "login": {
                    validators: {
                        notEmpty: {
                            message: "Введіть логін"
                        },
                        stringLength: {
                            min: 3,
                            max: 25,
                            message: "Логін повинен містити не менше 3 та не більше 25 символів"
                        }
                    }
                },
                "email": {
                    validators: {
                        notEmpty: {
                            message: "Введіть електронну адресу"
                        },
                        emailAddress: {
                            message: "Електронна адреса введена невірно"
                        }
                    }
                },
                "password": {
                    validators: {
                        notEmpty: {
                            message: "Введіть пароль"
                        },
                        stringLength: {
                            min: 6,
                            message: "Пароль повинен містити не менше 6 символів"
                        },
                        identical: {
                            field: "password-repeat",
                            message: "Введені паролі не співпадають"
                        }
                    }
                },
                "password-repeat": {
                    validators: {
                        notEmpty: {
                            message: "Повторіть пароль"
                        },
                        identical: {
                            field: "password",
                            message: "Введені паролі не співпадають"
                        }
                    }
                },
                "file": {
                    validators: {
                        file: {
                            extension: "jpeg,jpg,png",
                            type: "image/jpeg,image/jpg,image/png",
                            maxSize: 2048 * 1024, // 2 MB
                            message: "Перевірте формат (jpeg/jpg/png) та розмір файлу"
                        }
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                form.get(0).submit();
            }
        });
        break;
    case 'settings':
        var info = isLoggedIn();
        if (info.role === "2") {
            $("#change-role-form").remove();
        } else {
            $('#change-role-form').bootstrapValidator({
                submitHandler: function (validator, form, submitButton) {
                    framework.sendAdminRequest(form.get(0));
                }
            });
        }
        $("#change-info-form").bootstrapValidator({
            live: 'enabled',
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                "change-pic": {
                    validators: {
                        file: {
                            extension: "jpeg,jpg,png",
                            type: "image/jpeg,image/jpg,image/png",
                            maxSize: 2048 * 1024, // 2 MB
                            message: "Перевірте формат (jpeg/jpg/png) та розмір файлу"
                        }
                    }
                },
                "change-login": {
                    validators: {
                        stringLength: {
                            min: 3,
                            max: 25,
                            message: "Логін повинен містити не менше 3 та не більше 25 символів"
                        }
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                form.get(0).submit();
            }
        });
        $("#change-pass-form").bootstrapValidator({
            live: 'enabled',
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                "current-pass": {
                    validators: {
                        notEmpty: {
                            message: "Введіть старий пароль"
                        }
                    }
                },
                "new-pass": {
                    validators: {
                        notEmpty: {
                            message: "Введіть новий пароль"
                        },
                        stringLength: {
                            min: 6,
                            message: "Пароль повинен містити не менше 6 символів"
                        },
                        identical: {
                            field: "new-pass-repeat",
                            message: "Введені паролі не співпадають"
                        }
                    }
                },
                "new-pass-repeat": {
                    validators: {
                        notEmpty: {
                            message: "Повторіть новий пароль"
                        },
                        identical: {
                            field: "new-pass",
                            message: "Введені паролі не співпадають"
                        }
                    }
                },
            },
            submitHandler: function (validator, form, submitButton) {
                framework.changePassword(form.get(0));
            }
        });
        break;
    }
});