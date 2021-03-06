new Vue({
    el: "#root",
    data: {
        width: null,
        darkMode: false,
        message: null,
        sent: false,
        onChat: null,
        contactName: null,
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
        },
        onMessage: null,
        onClick: false,
        y: 600,
        x: 200,
        isDeleted: function (message) {
            return {
                deleted: message.deleted
            }
        }
    },
    methods: {
        onMobile: function () {
            this.width = window.innerWidth;

            if (this.width < 768) {
                document.querySelector("aside").style.display = "none";
                document.querySelector("main").style.display = "flex";
            }
        },
        back: function () {
            document.querySelector("main").style.display = "none";
            document.querySelector("aside").style.display = "flex";
        },
        switchMode: function () {
            let content = document.querySelector(".content");

            let moon = document.getElementById("moon");
            let sun = document.getElementById("sun");

            let link = document.querySelector("head link#style");
            let darkPath = "./assets/css/dark.css";
            let lightPath = "./assets/css/light.css";

            let main = document.querySelector(".content > main");

            if (this.darkMode) {
                content.style.animation = "showing_light 300ms linear";

                sun.style.animation = "hiding 500ms linear forwards";
                moon.style.animation = "showing 500ms linear forwards";
                link.setAttribute("href", lightPath);

                if (this.onChat == null) {
                    main.style.borderLeft = "1px solid #4adf83";
                } else {
                    main.style.borderLeft = "1px solid #e4e5e6";
                }
            }
            if (!this.darkMode) {
                content.style.animation = "showing_dark 400ms linear";

                sun.style.animation = "showing 500ms linear forwards";
                moon.style.animation = "hiding 500ms linear forwards";
                link.setAttribute("href", darkPath);
                main.style.borderLeft = "1px solid #3c4346";
            }

            this.darkMode = !this.darkMode;
        },
        showWelcome: function () {
            let main = document.querySelector(".content > main");

            if (!this.darkMode) {
                if (this.onChat == null) {
                    main.style.borderLeft = "1px solid #4adf83";
                } else {
                    main.style.borderLeft = "1px solid #e4e5e6";
                }
            }
            else {
                main.style.borderLeft = "1px solid #3c4346";
            }
        },
        send: function (refs) {
            if (this.message) {
                let msg = getMessage(this.message, "sent");

                contacts[this.onChat].messages.push(msg);
                this.message = null;
                refs.msg.focus();
                this.sent = true;
            }
        },
        received: function () {
            if (this.sent === true) {
                let msg = getMessage("ok", "received");

                setTimeout(() => {
                    contacts[this.onChat].messages.push(msg);
                }, 1000);
                this.sent = false;
            }
        },
        searching: function (key, val) {
            if (val)
                return key.toLowerCase().includes(val.toLowerCase());
            else
                return true;
        },
        mouseenter: function (i) {
            this.onMessage = i;
        },
        mouseleave: function () {
            if (!this.onClick)
                this.onMessage = null;
        },
        open: function (event) {
            this.y = event.clientY;
            this.x = event.clientX;
            this.onClick = !this.onClick;
        },
        close: function () {
            if (this.onClick) {
                this.onClick = false;
                this.onMessage = false;
            }
        },
        remove: function () {
            this.contacts[this.onChat].messages[this.onMessage].text = "Hai eliminato questo messaggio.";
            this.contacts[this.onChat].messages[this.onMessage].deleted = true;
            this.close();
        }
    },
    created: function () {
        this.showWelcome();
    },
    updated: function () {
        this.onMobile();
        this.showWelcome();
        this.received();
    },
});

function getMessage(message, status) {
    let date = getDate();
    let time = getTime();

    return {
        date: date,
        time: time,
        text: message,
        status: status
    }
}

function getDate(date = new Date()) {
    return [date.getDate(), date.getMonth()+1, date.getFullYear()].map(n => n < 10 ? `0${n}` : `${n}`).join("/");
}

function getTime(time = new Date()) {
    return [time.getHours()-1, time.getMinutes()].map(n => n < 10 ? `0${n}` : `${n}`).join(":");
}