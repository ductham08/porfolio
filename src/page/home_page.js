import banner from "../layout/banner"
import footer from "../layout/footer"
import header from "../layout/header"
import "../publics/css/home_page.css"
import dayjs from "dayjs"

const home_page = {
        async render() {
            const data_post = await (await fetch("https://porfolio-theta-nine.vercel.app/posts?_expand=category_Post&_end=2")).json()
            const data_projects = await (await fetch("https://porfolio-theta-nine.vercel.app/projects?_expand=category_Project&_end=3")).json()
            return /*html*/ `
            <div id="ctn_home" class="ctn_home_page">
                <div class="header">
                    ${header.render()}
                </div>
                <div>
                     ${await banner.render()}
                </div>
                <div class="ctn_article">
                    <div class="recent_post">
                        <div class="container">
                            <h5>Recent post</h5>
                            <a class="view_recent_post" href="/blog">View all</a>
                            <div class="list_recent_post">
                                ${data_post.map(item => {
                                return /*html*/ `
                                <div class="post col-md-6 col-12">
                                    <div class="detail_post">
                                        <h4><a href="/blog/${item.id}">${item.title}</a></h4>
                                        <p>${dayjs(item.createat).format('DD MMMM YYYY')}  |  ${item.category_Post.name}</p>
                                        <p class="content_post">${item.content}</p>
                                    </div>
                                </div>
                                `
                                }).join("")}
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="list_project">
                            <h5>Projects</h5>    
                            ${data_projects.map((item)=>{
                                return /*html*/ `
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
                                    <hr style="clear:both;">
                                `
                            }).join("")}
                        <div>
                    </div>
                </div>
                
                <div class="ctn_footer">
                    ${footer.render()}
                </div>
            </div>
        `
    }
}
export default home_page