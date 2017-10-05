
function loadInfo() {
    let jobId=getQueryVariable("jobid");
    if(jobId !=null && jobId.toString().length>1) {
        getJobDetailFromSQ(jobId);
        getRecommendJobsFromSQ(jobId);
    }

}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function getLogOrNot(status, str) {
    if(status==0){
        $('#judgeWhetherLog').empty();
        $("#judgeWhetherLog").append(`<div>
            <span>
            <a href="login.html" class="login">登录</a>
            </span>
            <span style="color: #c4c3c3">|</span>
            <span>
            <a href="register.html" class="register">注册</a>
            </span>
            </div>`);
    }
    else {
        $('#judgeWhetherLog').empty();
        $("#judgeWhetherLog").append(`<div>
            <span>
            <a href="person.html" class="welcome">Hello~ ${str}</a>
            </span> 
            </div>`);
    }
}

function getJobDetailFromSQ(jobId) {
 $.get(
     `${baseHost}/post/detail?jobid=${jobId}`,
     function (jobInfo) {
         loadJobInfo(jobInfo);
     }
 )
}
function getRecommendJobsFromSQ(jobId) {
    $.ajax({
        type: 'GET',
        url:`${baseHost}/post/similar?jobid=${jobId}`,
        success: function(jobs) {
            loadRecommendJobs(jobId,jobs.slice(0,5));
        }
    })
}
function loadJobInfo(jobInfoArray) {
    let jobInfo=jobInfoArray[0];
    $("#jobTitle").text(jobInfo.title);
    $("#postData").text('发布时间: '+jobInfo.sdate);
    $("#tags").text(jobInfo.tags);
    $("#catagory").text(jobInfo.catagory);
    $("#jobtype").text(jobInfo.jobtype);
    $("#salary").text(jobInfo.salary+'元');
    $("#address").text(jobInfo.address);
    $("#number").text(jobInfo.number+'人');

    $("#jobDescription").append(jobInfo.description);//引入富文本编辑

    $("#apply").text(jobInfo.apply);

    $("#company").text(jobInfo.company);
    $("#country").text(jobInfo.country);
    $("#city").text(jobInfo.city);


}

function loadRecommendJobs(jobId,jobs) {
    let countNum = 0;
    for (let job of jobs) {
        if (jobId != job.id) {
            $("#recommendJobs").append(`
            <a class="link" style="color:#333;cursor: pointer;text-decoration: none;" href="detail.html?jobid=${job.id}">
              <div style=" margin:0 2%;padding: 2% 5%">
                   <span class="title">${job.title}</span><br>
                   <span class="sdate">${job.sdate}</span>
               </div>
            </a>
            
            `);
            countNum++;
        }
        if (countNum == 4) break;
    }
}

function goBack() {
    window.history.back();
}