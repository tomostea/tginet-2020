//import 'leaflet/dist/leaflet.css'; //<--------------add this line

const app = new Vue({
    el: '#app',
    template: `
    <div style="padding-left:10px">

    <div class="radio-inline">
    <label v-for="type in types">
        <input type="radio" v-model="checked" v-bind:value="type.name" v-on:click="on_chose_type" style="margin-left:10px">{{ type.name }}
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
            {name: 'all'},
            {name: 'trouble' },
            {name: 'request' }
        ],
        checked: 'all',
        prev_checked: 'all',
        layers: {},
    },

    mounted: function () {
        const url = "/"
        fetch(url, {
            method: 'GET'
        })
            .then(r => r.json())
            .then(r => {this.reports = r;
                this.$nextTick(function () {
                    //サーバーからの値の読み込み
                    //this.reports = this.generate_reports_example();
                    console.log(r);
                    console.log(this.reports);
 
                    //地図の初期化
                    this.init_map();
                });
            })
            .catch(e => console.log(e))

        
        //レイヤーグループの初期化
        for(var type of this.types){
            this.layers[type.name] = L.layerGroup();
        }

    },
    methods: {
        init_map: function () {
            this.map = L.map('mapcontainer');

            this.map.setView([35.655755 , 139.755465], 14);
            L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
                //attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>オープンストリートマップ</a>"
            }).addTo(this.map);

            //レイヤーグループにピンを足す
            this.add_pin();
            this.map.addLayer(this.layers['all']); 
        },

        reset_map: function(){
            this.map.remove();
            this.map = null;
            this.init_map();
        },

        on_chose_type: function(){
            const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
            (async () => {
                await sleep(100);
                this.map.removeLayer(this.layers[this.prev_checked]);
                this.map.addLayer(this.layers[this.checked]); 
                this.prev_checked = this.checked;
            })();
        },
        
        //resultsの中身からmapにピンを生成する
        add_pin: function(){
            for(var report of this.reports){
                //console.log(report);
                var position = [report.longitude, report.latitude];
                var type_name = report.type;
                //console.log(type_name);
                
                var popup = L.popup().setContent(report.comment);
                //imege version
                //ポップアップする文字（HTML可、ここでは画像を表示）
                var sucontents = `${report.comment}<br><img src='/static/images/46827f22bfbb162e5f9a6b7dbdaad990d9671d9ea8406a4f7ae72fb32c1e3ff69c3740816fac00d8ff3fc68789ddb3085cbb7a2b77a5b47812db4971be5c43c4.png' width='500' height='375'>`
                var popupimg = L.popup({ maxWidth: 550 }).setContent(sucontents);
                var marker = L.marker(position, { draggable: true }).bindPopup(popupimg);
                //no image version
                //var marker = L.marker(position).bindPopup(popup).addTo(this.map);
                
                this.layers[type_name].addLayer(marker);
                this.layers['all'].addLayer(marker);
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
                  type: 'trouble',
                  longitude: 35.8627,
                  latitude: 139.6072,
                  imageid: 'abcd',
                  comment: '直して',
                },
                {
                  type: 'request',
                  longitude: 35.655755,
                  latitude: 139.755465,
                  imageid: '1234',
                  comment: '欲しい',
                },
              ];
            return List;
        },

    },
})