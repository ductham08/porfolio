import footer from "../layout/footer"
import header from "../layout/header"
import "../publics/css/blog_page.css"
import dayjs from "dayjs"

const blog_page = {
        async render() {
            const data_blog = await (await fetch("http://localhost:3001/posts?_expand=category_Post")).json()

            return /*html*/ `
        <div class="ctn_blog">
            <div class="header">
                ${header.render()}
            </div>
            <div class="container col-md-9 col-11 ctn_article">
                <h5>Blog</h5>
                <div class="list_blog">
                    ${data_blog.map(item => {
                        console.log(item)
                        return /*html*/`
                             <div class="post">
                                <h4><a href="/blog/${item.id}">${item.title}</a></h4>
                                <p>${dayjs(item.createat).format('DD MMMM YYYY')}  |  ${item.category_Post.name}</p>
                                 <p class="content_post">${item.content}</p>
                                 <hr>
                             </div>
                         `
                    }).join("")}
                </div>    
            </div>
            <div class="ctn_footer">
                ${footer.render()}
            </div>
        </div>
        `
    }
}

export default blog_page