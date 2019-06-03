function isValidField(requiredField) {
    const missingField = requiredField.find(field => field === "");
    console.log('missingField=' + missingField)
    console.log(requiredField)
    if (missingField == "") {
        return false;
    } else {
        return true;
    }
}

$(document).ready(function () {
    $(".btnContact").click(function (event) {
        event.preventDefault();
        const name = $("#name").val();
        const age = $("#age").val();
        const weight = $("#weight").val();
        const height = $("#height").val();
        const gender = $("input[type='radio'][name='gender']:checked").val();
        const isPregnant = ($("input[type='radio'][name='isPregnant']:checked").val() === "true") ? true : false;
        const username = $("#username").val();
        const password = $("#password").val();
        const passwordConfirm = $("#passwordConfirm").val();
        if (password !== passwordConfirm) {
            $(".userError").text("Password not match!");
        } else {
            const newUser = {
                name: name,
                username: username,
                password: password,
                age: age,
                gender: gender,
                height: height,
                weight: weight,
                isPregnant: isPregnant
            };
            console.log(newUser);

            //user validation on empty field and non defined field input.
            const requiredField = [
                {field: "name", val: name},
                {field: "username", val: username},
                {field: "password", val: password},
                {field: "age", val: age},
                {field: "height", val: height},
                {field: "weight", val: weight}];

            let requiredFieldFlag = false;
            requiredField.forEach(field => {
                if (field.val === "" || field === undefined) {
                    requiredFieldFlag = true;
                    $("#" + field.field).addClass("error");
                } else {
                    $("#" + field.field).removeClass("error");
                }
            });

            if (requiredFieldFlag) {
                $(".userError").text("Please fill out the form!");
            } else {
                $.post("/api/post", newUser)
                    .then(function (res) {
                        $("#username").removeClass("error");
                        $(".userError").text();
                        console.log(JSON.stringify(res));
                        //redirect to user account

                    })
                    .catch(function (error) {
                        if (error.status == "400") {
                            $("#username").addClass("error");
                            $(".userError").text("username already taken!");
                        } else {
                            console.log('Internal Error');
                        }


                    })
            }
        }

    });


    $("#bttonSearch").on("click", (e) => {
        e.preventDefault();
        let userInput = $("#inputSearch").val();
        userInput.split(" ").join("%20");
        searchFood(userInput);
    });
});


function searchFood(foodRequest) {
    $.post("/api/query", {foodRequest})
        .then(function (data) {
            console.log("Working");
            // response from the database query
            console.log(data);
        });
}