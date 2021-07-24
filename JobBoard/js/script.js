document.querySelector(".button-container").addEventListener("click", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        setTimeout(function(){
            showJobs(filteredJobs);
        }, 500)
        openLoad();
    })
})

function getJobs(limit = 100){
    return fetch(`https://remotive.io/api/remote-jobs?limit=${limit}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data.jobs;
    })
}

function filterJobs(jobs, searchText){
    if(searchText){
        let filteredJobs = jobs.filter(job => {
            if(
                job.title.toLowerCase().includes(searchText) || 
                job.category.toLowerCase().includes(searchText) || 
                job.company_name.toLowerCase().includes(searchText) ||
                job.description.toLowerCase().includes(searchText)){
                return true;
            } else {
                return false;
            }
        })
        return filteredJobs;
    } else {
        return jobs;
    }
}

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
}

const openLoad = function(){
    let modal = document.querySelector(".modal");
    modal.style.display = 'block';

    setTimeout(function(){
        modal.style.opacity = 100;
    }, 50)
}

const closeLoad = function(){
    let modal = document.querySelector(".modal");

    setTimeout(function(){
        modal.style.opacity = 0;
    }, 2000)

    setTimeout(function(){
        modal.style.display = 'none';
    }, 3000)
}
 
function showJobs(jobs){
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    let jobTotal = document.querySelector(".total-jobs")
    let totalJobs = "";
    let counter = 0;

    jobs.forEach(job => {
        counter++;
        jobsHTML += `
            <div class="job-tile">
                <div class="top">
                    <img src="${job.company_logo_url}" onerror="src='https://ziasyed2000.github.io/JobBoard/img/logo.png'">
                    <span class="material-icons more-horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.title}</span>
                </div>
                <div class="description">
                    <span>${job.description.replace( /(<([^>]+)>)/ig, ' ').substr(0, 100)}...</span>
                </div>
                <div class="buttons">
                    <a class="button apply-now" href=${job.url} target="_blank">
                    Apply Now
                    </a>
                    <div class="button message">
                        Message
                    </div>
                </div>
            </div>
        ` 
    });

    if (counter > 1) {
        totalJobs += `Showing ${counter}+ Jobs`
    } else {
        totalJobs += `Showing ${counter} Job`
    }

    closeLoad();
    
    jobsContainer.innerHTML = jobsHTML;
    jobTotal.innerHTML = totalJobs;
}

getJobs().then(data => {
    showJobs(data);
})
