new Vue({
    el: "#root",
    data: {
        onChat: 1,
        contacts: contacts
    },
    methods: {
        /*showWelcome: function () {
            let main = document.querySelector(".content > main");

            if (this.onChat == null) {
                main.style.borderLeft = "1px solid #4adf83";
            }
            else {
                main.style.borderLeft = "1px solid #000";
            }
        }*/
    },
    created: function () {
        /*this.showWelcome();*/
    }
});