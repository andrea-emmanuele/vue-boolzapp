new Vue({
    el: "#root",
    data: {
        onChat: false,
        contacts: contacts
    },
    methods: {
        showWelcome: function () {
            if (!this.onChat) {
                let main = document.querySelector(".content > main");
                main.style.borderLeft = "1px solid #4adf83";
            }
        }
    },
    created: function () {
        this.showWelcome();
    }
});