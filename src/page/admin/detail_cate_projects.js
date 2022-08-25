import header_admin from "./header_admin"
import dayjs from "dayjs"


const detail_cate_pro = {
        async render(id) {
            const data = await (await fetch(`https://porfolio-theta-nine.vercel.app/category_Projects/${id}?_embed=projects`)).json()
            const data_post = data.projects
            console.log(data_post)
            return /*html*/ `
            <div class="ctn_detail_cate_pro">
                <div>
                    ${header_admin.render()}
                </div>
                <div class="container col-md-9 col-11 ctn_article">
                <h5>Projects</h5>
                <div class="list_blog">
                ${data_post.map(item => {
                    return /*html*/ `
                        <div class="post">
                            <h4><a href="/project/${item.id}">${item.name}</a></h4>
                            <p>${dayjs(item.createat).format('YYYY')}  |  ${data.name}</p>
                            <p class="content_post">${item.content}</p>
                            <hr>
                        </div>
                    `
                }).join("")}
                </div>
            </div>
        `
    }
}

export default detail_cate_pro