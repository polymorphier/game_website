const OriginalNameInd = 0;
const ChineseNameInd = 1;
const WebLinkInd = 2;
const ChineselizeInd = 3;
const DownloadLinkInd = 4;
const GameTypeInd = 6;
const CompanyInd = 7;
const TagInd = 8;
const OtherInd = 9;


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

        var Tags = "";
        if (d.length >= 9) {
            Tags = d[TagInd].split("、");
        }

        var TagString = "";
        Array.prototype.forEach.call(Tags, (t) => {
            TagString += `<a href='javascript:void(0);' target='_blank'; onclick='return search_tags("${t}");'>${t}</a> `;
        });

        index += 1;

        let Card = `
        <div class="card">
            <div class="avatar">
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

