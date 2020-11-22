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
    画像
    <input type="file" id="image" @change="getImage">
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
        image: "",
        comment: ""
    },
    methods: {
        getBase64: function (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            })
        },
        getImage: async function (event) {
            const files = event.target.files || event.dataTransfer.files
            const file = files[0]
            const picture = await this.getBase64(file)
            this.image = picture
        },
        postRecord: function () {
            const url = "/"
            const data = {
                type: this.checked,
                btName: this.btName,
                comment: this.comment,
                image: this.image
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