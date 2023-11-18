const OriginalNameInd = 0;
const ChineseNameInd = 1;
const WebLinkInd = 2;
const ChineselizeInd = 3;
const DownloadLinkInd = 4;
const GameTypeInd = 6;
const CompanyInd = 7;
const TagInd = 8;
const NoteInd = 9;


function display_games(game_array, DisplayInds) {
    var index = 0;
    
    for (i of DisplayInds){
        d = game_array[i];
        var OriginalName = "<a href=" + d[WebLinkInd] + " target='_blank'>" + d[OriginalNameInd] + "</a>";
        if (d[WebLinkInd] == "") {
            OriginalName = d[OriginalNameInd];
        }
        var ChineseName = d[ChineseNameInd];
        var DownloadLink = d[DownloadLinkInd];
        var DownloadLinkImportScript =
            "<a href=" + DownloadLink + ' target="_blank">Download</a>';
        if (DownloadLink == "") {
            DownloadLinkImportScript = "Unavailable";
        }

        var GameType = d[GameTypeInd];

        var chineselize = '<span class="bolded" style="color: rgb(150, 20, 20)">未漢化</span>';
        if (d[ChineselizeInd] == "TRUE") {
            chineselize = '<span  class="bolded" style="color: rgb(19, 50, 120)">已漢化</span>';
        }

        // // images from google drive
        // var ImgID = d[5].split('/')[5]; // template: https://drive.google.com/file/d/[image_id]/view?usp=sharing
        // var ImgLink = "https://drive.google.com/uc?export=view&id="+ImgID;
        var ImgLink = "imgs/" + d[OriginalNameInd] + ".jpg";
        // console.log(ImgLink);
        var com = d[CompanyInd];

        var Tags = "";
        if (d.length >= TagInd+1) {
            Tags = d[TagInd].split("、");
        }

        var TagString = "";
        Array.prototype.forEach.call(Tags, (t) => {
            TagString += `<a href='javascript:void(0);' target='_blank'; onclick='return search_tags("${t}");'>${t}</a> `;
        });

        // show note
        var note = "";
        if (d.length >= NoteInd+1) {
            note = d[NoteInd];
        }

        
        index += 1;
        let Card = `
        <div class="card">
            <div class="avatar" title="開發商: ${com}\n${note}">
                <img src="${ImgLink}">
            </div>
            <div class="text-center">
                <h4>${index}. ${OriginalName}</h4>
                <p> ${ChineseName} </p>
                <p> ${GameType} ${chineselize} ${DownloadLinkImportScript} </p>
                <p> ${TagString} </p>                  
            </div>
        </div>`;


        document.querySelector(".js-append-card").insertAdjacentHTML("beforeend", Card);
    }

    // Array.prototype.forEach.call(game_array, (d) => {
    //     var OriginalName = "<a href=" + d[WebLinkInd] + " target='_blank'>" + d[OriginalNameInd] + "</a>";
    //     if (d[WebLinkInd] == "") {
    //         OriginalName = d[OriginalNameInd];
    //     }
    //     var ChineseName = d[ChineseNameInd];
    //     var DownloadLink = d[DownloadLinkInd];
    //     var DownloadLinkImportScript =
    //         "<a href=" + DownloadLink + ' target="_blank">Download</a>';
    //     if (DownloadLink == "") {
    //         DownloadLinkImportScript = "Unavailable";
    //     }

    //     var GameType = d[GameTypeInd];

    //     var chineselize = '<span class="bolded" style="color: rgb(150, 20, 20)">未漢化</span>';
    //     if (d[ChineselizeInd] == "TRUE") {
    //         chineselize = '<span  class="bolded" style="color: rgb(19, 50, 120)">已漢化</span>';
    //     }

    //     // // images from google drive
    //     // var ImgID = d[5].split('/')[5]; // template: https://drive.google.com/file/d/[image_id]/view?usp=sharing
    //     // var ImgLink = "https://drive.google.com/uc?export=view&id="+ImgID;
    //     var ImgLink = "imgs/" + d[OriginalNameInd] + ".jpg";
    //     // console.log(ImgLink);

    //     var Tags = "";
    //     if (d.length >= 9) {
    //         Tags = d[TagInd].split("、");
    //     }

    //     var TagString = "";
    //     Array.prototype.forEach.call(Tags, (t) => {
    //         TagString += `<a href='javascript:void(0);' target='_blank'; onclick='return search_tags("${t}");'>${t}</a> `;
    //     });

    //     index += 1;

    //     let Card = `
    //     <div class="card">
    //         <div class="avatar">
    //             <img src="${ImgLink}">
    //         </div>
    //         <div class="text-center">
    //             <h4>${index}. ${OriginalName}</h4>
    //             <p> ${ChineseName} </p>
    //             <p> ${GameType} ${chineselize} ${DownloadLinkImportScript} </p>
    //             <p> ${TagString} </p>                  
    //         </div>
    //     </div>`;

    //     document.querySelector(".js-append-card").insertAdjacentHTML("beforeend", Card);
    // });

}

function extract_tags(game_array){
    var tags_array = [];
    index = 0;
    Array.prototype.forEach.call(game_array, (d) => {

        var Tags = [];
        if (d.length >= 9) {
            Tags = d[TagInd].split("、");
        }
        tags_array.push(Tags);
    });
    // console.log("extracted tags:");
    // console.log(tags_array);

    return tags_array;
}

function search_tags(search_tag) {
    sessionStorage.setItem("tag_target", search_tag);
    open("./search_page.html");
}

function get_unique_tags(tags_array){
    var tags = [];
    for (t of tags_array){
        tags = tags.concat(t);
    }
    let uniqueTags= Array.from(new Set(tags));
    return uniqueTags;
}

function build_tag_dict(game_array){
    var company_dict = {};
    var tags_dict = {};
    TagTargetInd = [CompanyInd, TagInd];
    
    index = 0;

    // console.log(`game_array: ${game_array}`)
    Array.prototype.forEach.call(game_array, (d) => {

        // build tag dictionary
        let com = d[CompanyInd].trim();
        if (company_dict.hasOwnProperty(com)){
            company_dict[com].push(index);
        }else{
            company_dict[com] = [index];
        }

        // build tag dictionary
        var Tags = [];
        if (d.length >= TagInd+1) {
            Tags = d[TagInd].trim().split("、");
            for (t of Tags){
                if (t=='') {
                    // console.log(d[OriginalNameInd]); 
                    continue;
                }
                if (tags_dict.hasOwnProperty(t)){
                    tags_dict[t].push(index);
                }else{
                    tags_dict[t] = [index];
                }
            }
        }
        index++;
    });
    // console.log("extracted tags:");
    // console.log(tags_array);
    window.localStorage.setItem("company_dict", JSON.stringify(company_dict));
    window.localStorage.setItem("tags_dict", JSON.stringify(tags_dict));

}

function get_tag_dict(dict_name){
    return JSON.parse(window.localStorage.getItem(dict_name));
}