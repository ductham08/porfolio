import header_admin from "./header_admin"
import "../../publics/css/admin/home.css"

const home_admin = {
        async render() {

            const data_post = await (await fetch("https://porfolio-theta-nine.vercel.app/posts")).json()
            const data_project = await (await fetch("https://porfolio-theta-nine.vercel.app/projects")).json()
            const data_cate_post = await (await fetch("https://porfolio-theta-nine.vercel.app/category_Posts")).json()
            const data_cate_pro = await (await fetch("https://porfolio-theta-nine.vercel.app/category_Projects")).json()
            const data_user = await (await fetch("https://porfolio-theta-nine.vercel.app/user")).json()

            const length_arr_post = data_post.length
            const length_arr_project = data_project.length
            const length_arr_cate_post = data_cate_post.length
            const length_arr_cate_pro = data_cate_pro.length
            return /*html*/ `
                <div>
                    <div>
                        ${header_admin.render()}
                    </div>
                    <div class="container article_home_admin">
                        <h5>Statistic:</h5>
                        <div class="statistic">
                            <div class="detail post">
                                <h5><a href="/admin/post">Post</a></h5>
                                <p>Amount: ${length_arr_post}</p>
                            </div>
                            <div class="detail post">
                                <h5><a href="/admin/categorypost">Category post</a></h5>
                                <p>Amount: ${length_arr_cate_post}</p>
                            </div>
                            <div class="detail post">
                                <h5><a href="/admin/project">Project</a></h5>
                                <p>Amount: ${length_arr_project}</p>
                            </div>
                            <div class="detail project">
                                <h5><a href="/admin/categorypost">Category project</a></h5>
                                <p>Amount: ${length_arr_cate_pro}</p>
                            </div>
                        </div>
                        <div class="info_user">
                            <h5>User information:</h5>
                            ${data_user.map(item => {
                                return /*html*/ `
                                    <div class="avatar">
                                        <img src="${item.image}" width="100%" alt="" srcset="">
                                    </div>
                                    <div class="info">
                                        <h5>Wellcome ${item.name} !</h5>
                                        <p>Position: <i>${item.position}</i></p>
                                        <p class="desc">- ${item.desc}</p>
                                        <button><a href="/admin/user/edit">Edit profile</a></button>
                                        <p><button style="font-size: 14px;padding: 2px 10px;margin: 5px 25px;" id="btn_logout">Đăng xuất</button></p>
                                    </div>
                                `
                            })}
                        </div>
                    </div>
                </div>
            `
    }, after_Render(){
        if(document.getElementById("btn_logout")){
            document.getElementById("btn_logout").addEventListener("click",function(){
                localStorage.removeItem('user');
                location.href = "/admin"
            })
        }
    }
}

export default home_admin