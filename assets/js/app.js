new Vue({
    el: "#root",
    data: {
        onChat: false
    },
    methods: {
        showWelcome: function () {
            if (!this.onChat) {
                let main = document.querySelector("section#root > main");
                main.style.borderLeft = "1px solid #4adf83";
            }
        }
    },
    created: function () {
        this.showWelcome();
    }
});