const app = new Vue({
    el: '#app',
    template: `
    <div>
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
        btName: "BT01",
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
        }
    }
})