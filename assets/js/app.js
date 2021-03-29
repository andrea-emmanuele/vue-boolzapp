new Vue({
    el: "#root",
    data: {
        message: null,
        sent: false,
        onChat: 0,
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
        }
    },
    created: function () {
        this.showWelcome();
    },
    updated: function () {
        this.showWelcome();
        this.received();
    }
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