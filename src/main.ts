
let projectForm = document.querySelector('.projectForm')

let projectName = document.querySelector('#projectName')
let projectUrl = document.querySelector('#projectUrl')
let founder = document.querySelector('#founder')
let desc = document.querySelector('#desc')
let years = document.querySelector('#years')

let projectsTable = document.querySelector('.projectsTable' as HTMLTableElement)

let currentIndex : number;

interface project{
    id: number;
    projectName: string;
    projectUrl: string;
    founder: string;
    desc: string;
    years: string;
}

let projects : project[] = []

projectForm?.addEventListener("submit",(e)=>{
    e.preventDefault()

    let project = projectName.value.trim() != "" && projectUrl.value.trim() != "" && founder.value.trim() != "" && desc.value.trim() != "" && years.value.trim() != "" 

    if(project){
        let projectDetails = {
            id: project.length + 1
            projectName: projectName.value.trim(),
            projectUrl: projectUrl.value.trim(),
            founder: founder.value.trim(),
            desc: desc.value.trim(),
            years: years.value.trim()
        }

        if(currentIndex){
            projects.splice(currentIndex, 1, projectDetails)
        }else{
            projects.push(projectDetails)

            localStorage.setItem("projects", JSON.stringify(projects))
        }

        instance.displayprojects()

        projectName.value = ""
        projectUrl.value = ''
        founder.value = ""
        desc.value = ''
        years.value = ''
    }
})

class projectsActions{
    displayProjects(){
        let allProjects = document.querySelectorAll('.project .projects') as NodeListOf<HTMLDivElement>
        allProjects.forEach(el=>{
            el.remove
        })

        projects.forEach((project: project, index:number)=>{

            let projectProfile = <HTMLTableRowElement >document.createElement('tr')
            projectProfile.className = "projectProfile"

            let numbering = document.createElement('td') as HTMLTableCellElement
            numbering.textContent = `${index + 1}`

            let projectName = document.createElement('img') as HTMLImageElement
            projectName.textContent = project.projectName

            let projectUrl = document.createElement('td') as HTMLTableCellElement
            projectUrl.textContent = project.projectUrl

            let founder = document.createElement('td') as HTMLTableCellElement
            founder.textContent = project.founder

            let desc = document.createElement('td') as HTMLTableCellElement
            desc.textContent = project.desc

            let years = document.createElement('td') as HTMLTableCellElement
            years.textContent = project.years

            let deletebtn= document.createElement('button') as HTMLButtonElement
            deletebtn.textContent = "Delete"
            deletebtn.style.backfaceVisibility = 'red'
            deletebtn.addEventListener('click', ()=>{
                this.deleteproject(index)
            })

            productsTable.appendChild(numbering);
            productsTable.appendChild(projectName);
            productsTable.appendChild(projectUrl);
            productsTable.appendChild(desc);
            productsTable.appendChild(founder);
            productsTable.appendChild(years);

            productsTable.appendChild(tableRow);

        })
    }

    deleteproduct(index: number){
        projects.splice(index, 1)

        this.displayprojects()
    }

    updateproject(index:number){
        currentIndex = index

        console.log(currentIndex);

        projectForm.style.display = 'flex'

        let project = projects[index]

        projectName.value = project.name
        projectUrl.value = project.image
        desc.value = project.desc
        founder.value = project.price
        years.value = project.discount      
    }
}

let instance = new projectsActions

instance.displayprojects();