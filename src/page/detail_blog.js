import footer from "../layout/footer"
import header from "../layout/header"
import "../publics/css/detail_blog.css"
import dayjs from "dayjs"


const detail_blog = {
    async render(id) {
        const data_blog_detail = await (await fetch(`http://localhost:3001/posts/${id}?_expand=category_Post`)).json()
        return /*html*/ `
        <div class= "ctn_detail_blog">
            <div class="header">
                ${header.render()}
            </div>
            <div class="container ctn_article col-md-12 col-10">
                <h4>${data_blog_detail.title}</h4>
                <p class="category">${dayjs(data_blog_detail.createat).format('DD MMMM YYYY')}  |  ${data_blog_detail.category_Post.name}</p>
                <p class="content_blog">${data_blog_detail.content}</p>
                <hr>
            </div>
            <div class="ctn_footer">
                ${footer.render()}
            </div>
        </div>
        `
    }
}

export default detail_blog