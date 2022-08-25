import "../publics/css/projects_page.css"
import header from "../layout/header"
import footer from "../layout/footer"
import dayjs from "dayjs"

const project_page = {
        async render() {
            const data_projects = await (await fetch("https://porfolio-theta-nine.vercel.app/projects?_expand=category_Project")).json()
            return /*html*/ `
        <div class = "ctn_projects">
            <div class="header">
                ${header.render()}
            </div>
            <div class="ctn_article">
                <div class="container">
                    <h5>Projects</h5>
                    <div class="list_projects">
                        ${data_projects.map((item) => {
                            return /*html*/`
                            <div class="project col-12">
                                <div class="img_project col-md-3 col-12">
                                    <img src="${item.thumbnail}" width="100%"  alt="">
                                </div>
                                <div class="info_project col-md-8 col-12">
                                    <h4><a href="/project/${item.id}">${item.name}</a></h4>
                                    <p><i class="year_project">${dayjs(item.createat).format('YYYY')} </i> ${item.category_Project.name}</p>
                                    <p class="content_project">${item.content}</p>
                                </div>
                            </div>
                            `
                        }).join("")}
                    </div>
                </div>
            <hr>
            </div>
            <div class="ctn_footer">
                ${footer.render()}
            </div>
        </div>
        `
    }
}

export default project_page