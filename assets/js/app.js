new Vue({
    el: "#root",
    data: {
        onChat: null,
        contacts: contacts,
        status: function (message) {
            return {
                received: message.status === "received",
                sent: message.status === "sent"
            }
        },
        isActive: function (i) {
            return {
                active: i === this.onChat
            }
        }
    },
    methods: {
        showWelcome: function () {
            let main = document.querySelector(".content > main");

            if (this.onChat == null) {
                main.style.borderLeft = "1px solid #4adf83";
            }
            else {
                main.style.borderLeft = "1px solid #e4e5e6";
            }
        }
    },
    created: function () {
        this.showWelcome();
    },
    updated: function () {
        this.showWelcome();
    }
});