import footer from "../layout/footer"
import header from "../layout/header"
import "../publics/css/detail_blog.css"
import dayjs from "dayjs"

const detail_project = {
    async render(id) {
        const data_project_detail = await (await fetch(`http://localhost:3001/projects/${id}?_expand=category_Project`)).json()
        return /*html*/ `
        <div class= "ctn_detail_blog">
            <div class="header">
                ${header.render()}
            </div>
            <div class="container ctn_article col-md-12 col-10">
                <h4>${data_project_detail.name}</h4>
                <p><i class="year_project">${dayjs(data_project_detail.createat).format('YYYY')} </i> ${data_project_detail.category_Project.name}</p>
                <p class="content_blog">${data_project_detail.content}</p>
                <div class="img_project col-12">
                    <img src="${data_project_detail.thumbnail}" width="100%"  alt="">
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

export default detail_project