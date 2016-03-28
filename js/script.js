window.addEventListener("load", function() {

    var button = document.getElementById("button");
    var input = document.getElementById("info");
    var darkenBackground = document.getElementById("darkenBackground");
    var editClose = document.getElementById("editClose");
    var counter; //edit form counter for task number
    var taskLoc = window.localStorage.taskLoc || 0; // localstorage task-counter


    /*========== SETTING OL LIST FOR TASKS ===========*/

    var ol = document.createElement("ol");
    ol.setAttribute("id", "ol");
    document.forms[0].insertBefore(ol, input);


    /*========== Button -Add A Task- EVENT ===========*/

    button.onclick = function buttonOn() {

        if (ol.children.length >= 5) { // Only five tasks are allowed
            return alert("На сьогодні вистарчить!!!");
        }

        if (input.value == "") { // Check for empty field
            var warning = document.getElementById("warning");
            warning.innerHTML = info.dataset.warning;
            return;
        }

        if (input.value) { // Check for repeating value
            for (var i = 0; i < ol.children.length; i++) {
                if (input.value == ol.children[i].children[0].innerText) {
                    var warning = document.getElementById("warning");
                    warning.style.color = "red";
                    warning.innerHTML = info.dataset.repetition;
                    return;
                }
            }
        }

        document.getElementById("warning").innerHTML = "";

        var closeSign = document.createElement("span");
        closeSign.setAttribute("class", "glyphicon glyphicon-remove");

        var li = document.createElement("li");
        var a = document.createElement("a");

        a.innerHTML = input.value;
        li.appendChild(a);
        li.appendChild(closeSign);

        document.forms[0].children[0].appendChild(li);


        /*========== Local Storage Value Saving ===========*/

        taskLoc++;

        var counterDD = Math.floor(Math.random() * 10000);

        window.localStorage["task" + counterDD] = input.value;

        window.localStorage.setItem('taskLoc', taskLoc);

        input.value = "";


        /*========== REMOVE TASK Button (X)===========*/

        closeSign.onclick = function() {
            ol.removeChild(this.parentNode);

            console.log(taskLoc);
            taskLoc--;
            window.localStorage.setItem('taskLoc', taskLoc);

            for (prop in window.localStorage) {

                if (this.previousElementSibling.innerText == window.localStorage[prop]) {
                    window.localStorage.removeItem(prop);
                }
            }

        }


        /*========== EDIT MENU Field ===========*/

        a.onclick = function() {
            var self = this;
            console.log(self);

            for (counter = 0; counter < ol.children.length; counter++) {
                if (ol.children[counter].innerText == this.innerText) {
                    console.log(counter);
                    break;
                }
                continue;
            }

            darkenBackground.style.display = "block";

            var form = document.getElementById("wrapper-two");
            form.className = "center";
            form.style.display = "block";

            var editField = document.getElementById("editField");
            editField.setAttribute("value", counter + 1);

            editField.innerHTML = this.innerText;


            /*========== EDIT MENU Field ===========*/

            darkenBackground.onclick = function() {
                darkenBackground.style.display = "none";
                form.style.display = "none";
            }


            /*========== EDIT MENU CLOSE Button ===========*/

            editClose.onclick = function() {
                darkenBackground.style.display = "none";
                var editField = document.getElementById("editField");
                editField.innerHTML = input.value;

                form.style.display = "none";
            }


            /*========== EDIT MENU SAVE CHANGES Button ===========*/

            save.onclick = function(e) {
                e.preventDefault();

                darkenBackground.style.display = "none";

                form.style.display = "none";
                self.innerHTML = editField.innerText;
            }
        }

    }


    /*========== Reload Page Building Task List ===========*/

    if (ol.children && window.localStorage.taskLoc !== 0) {

        for (prop in window.localStorage) {
            if (prop == "taskLoc") {
                continue;
            }

            var closeSign = document.createElement("span");
            closeSign.setAttribute("class", "glyphicon glyphicon-remove");

            var li = document.createElement("li");
            var a = document.createElement("a");

            a.innerHTML = window.localStorage[prop];
            li.appendChild(a);
            li.appendChild(closeSign);

            ol.appendChild(li);

            closeSign.onclick = function() {
                ol.removeChild(this.parentNode);
                taskLoc == taskLoc > 0 ? taskLoc = 0 : taskLoc--;
                window.localStorage.setItem('taskLoc', taskLoc);

                for (prop in window.localStorage) {

                    if (this.previousElementSibling.innerText == window.localStorage[prop]) {
                        window.localStorage.removeItem(prop);
                    }
                }

            }

            /*========== EDIT MENU Field ===========*/

            a.onclick = function() {

                var self = this;

                for (counter = 0; counter < ol.children.length; counter++) {
                    if (ol.children[counter].innerText == this.innerText) {
                        console.log(counter);
                        break;
                    }
                    continue;
                }

                darkenBackground.style.display = "block";

                var form = document.getElementById("wrapper-two");
                form.className = "center";
                form.style.display = "block";

                var editField = document.getElementById("editField");
                editField.setAttribute("value", counter + 1);

                editField.innerHTML = this.innerText;


                /*========== EDIT MENU Field ===========*/

                darkenBackground.onclick = function() {
                    darkenBackground.style.display = "none";
                    form.style.display = "none";
                }

                /*========== EDIT MENU CLOSE Button ===========*/

                editClose.onclick = function() {
                    darkenBackground.style.display = "none";
                    var editField = document.getElementById("editField");

                    editField.innerHTML = input.value;

                    form.style.display = "none";
                }


                /*========== EDIT MENU SAVE CHANGES Button ===========*/

                save.onclick = function(e) {
                    e.preventDefault();

                    darkenBackground.style.display = "none";

                    form.style.display = "none";
                    self.innerHTML = editField.innerText;
                }
            }

        }
    }

});
