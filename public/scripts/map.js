//import 'leaflet/dist/leaflet.css'; //<--------------add this line

const app = new Vue({
    el: '#app',
    template: `
    <div style="padding-left:10px">

    <div class="radio-inline">
    <label v-for="type in types">
        <input type="radio" v-model="type" v-bind:value="type.name" style="margin-left:10px">{{ type.name }}
    </label>
    </div>

    Hello Vue!
    <div id="mapcontainer" style="width:600px;height:600px;"></div>
    </div>
    `,

    data: {
        map: "",
        reports: [], //サーバーから受け取った報告すべて
        types: [
            { id: 32, name: 'all' },
            { id: 0, name: 'trouble' },
            { id: 1, name: 'request' }
        ],
        type: {id: 32, name: 'all'},
    },

    mounted: function () {
        const url = "/"
        fetch(url, {
            method: 'GET'
        })
            .then(r => r.json())
            .then(r => alert(JSON.stringify(r)))
            .catch(e => console.log(e))


        this.$nextTick(function () {
            this.reports = this.generate_reports_example();
            this.init_map();
        });
    },
    methods: {
        init_map: function () {
            this.map = L.map('mapcontainer');

            this.map.setView([35.655755 , 139.755465], 14);
            L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
                //attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>オープンストリートマップ</a>"
            }).addTo(this.map);

            this.add_pin();
            //this.add_pin_test();
        },

        reset_map: function(){
            this.map.remove();
            this.map = null;
            this.init_map();
        },
        
        //resultsの中身からmapにピンを生成する
        add_pin: function(){
            console.log(this.type);
            for(var report of this.reports){
                //console.log(report);
                var position = [report.location.longitude, report.location.latitude];
                var report_name = report.situation;
                var type_name = report.types.id;
                //if(type_name == 'all' || this.type.name == type_name){
                    L.marker(position,{title:report_name,draggable:false}).addTo(this.map);
                //}
            }
        },

        add_pin_test : function(){
            var pins = [[35.8627, 139.6072], 
            [35.655755 , 139.755465],
            [35.455755 , 139.655465],]

            var count = 0;
            for(var item of pins){
                L.marker(item,{title:count,draggable:false}).addTo(this.map);
                console.log(item);
                count ++;
            }
        },

        generate_reports_example: function(){
            const List = [
                {
                    types: {
                        id: 0, name: 'trouble' ,
                    },    
                    
                    situation: '崩壊',
                    location: {
                        longitude: 35.8627,
                        latitude: 139.6072
                    },
                    imageid: 'abcd',
                    comment: '直して',
                },
                {
                    types: {
                        id: 1, name: 'request' 
                    },
                    situation: '追加',
                    location: {
                        longitude: 35.6,
                        latitude: 139.6072
                    },
                    imageid: '1234',
                    comment: '欲しい',
                },
            ];
            return List;
        },

    },
})