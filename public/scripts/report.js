const app = new Vue({
    el: '#app',
    template: `
    <div>
    <button v-on:click="findBleDevices">お困りスポットを取得する</button>
    タイプ
    <ul>
        <li v-for="type in types">
            <label><input type="radio" v-model="checked" v-bind:value="type.name">{{ type.name }}</label>
        </li>
    </ul>
    コメント
    <input v-model="comment">
    <button v-on:click="postRecord">送信！</button>
    <span>{{response}}</span>
    </div>
    `,
    data: {
        types: [
            { id: 0, name: 'trouble' },
            { id: 1, name: 'request' }
        ],
        response: "",
        checked: "",
        btName: "BT_DEVICE01",
        comment: ""
    },
    methods: {
        postRecord: function () {
            const url = "/"
            const data = {
                type: this.checked,
                btName: this.btName,
                comment: this.comment
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(r => r.json())
                .then(r => alert(r.status))
                .catch(e => console.log(e))
        },
        findBleDevices: function() {
            if (navigator.bluetooth) {
                navigator.bluetooth.requestDevice({ acceptAllDevices: true })
                    .then(device => device.name)
                    .then(id => this.btName = id)
                    .catch(err => console.log(err))
            } else {
                alert("bluetoothを使用できません!")
            }
        }
    }
})