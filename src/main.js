import Navigo from "navigo";
import add_cate_post_page from "./page/admin/add_cate_post";
import add_cate_pro_page from "./page/admin/add_cate_pro copy";
import add_post_page from "./page/admin/add_post";
import add_project_page from "./page/admin/add_project";
import cate_post_page from "./page/admin/cate_post";
import cate_pro_page from "./page/admin/cate_pro";
import detail_cate_post from "./page/admin/detail_cate_post";
import detail_cate_pro from "./page/admin/detail_cate_projects";
import edit_cate_post_page from "./page/admin/edit_cate_post";
import edit_cate_pro_page from "./page/admin/edit_cate_pro";
import edit_post from "./page/admin/edit_post";
import edit_project_page from "./page/admin/edit_project";
import edit_user from "./page/admin/edit_user";
import home_admin from "./page/admin/home";
import list_post_page from "./page/admin/list_post";
import list_project_page from "./page/admin/list_project";
import user_page from "./page/admin/user";
import blog_page from "./page/blog_page";
import contact_page from "./page/contact_page";
import detail_blog from "./page/detail_blog";
import detail_project from "./page/detail_project";
import home_page from "./page/home_page";
import project_page from "./page/projects_page";
import sign_in_page from "./page/singnin_page";
import sing_up_page from "./page/singnup_page";
const router = new Navigo("/", { linksSelector: "a" })

document.addEventListener("DOMContentLoaded", function() {
    async function view(page, id) {
        const app = document.querySelector("#app")
        if (app) {
            app.innerHTML = await page.render(id)
        }
        if (page.after_Render) await page.after_Render(id)
    }

    router.on({
        // Clien
        "/": () => view(home_page),
        "/contact": () => view(contact_page),
        "/project": () => view(project_page),
        "/project/:id": (data) => {
            const id = data.data.id
            view(detail_project, id)
        },
        "/blog": () => view(blog_page),
        "/blog/:id": (data) => {
            const id = data.data.id
            view(detail_blog, id)
        },

        // User
        "/signup": () => view(sing_up_page),
        "/signin": () => view(sign_in_page)

    })

    if ("/admin") {
        // Admin
        if (!JSON.parse(localStorage.getItem("user"))) {

            document.querySelector("#app").innerHTML = `
        <div class="container" style="text-align: center;padding: 50px 0px;">
                <h6>Vui lòng <a href="/signin">Đăng nhập</a> để xem trang này !</h6>
                <p><a href="/">Quay lại trang chủ</a></p>
        </div>
        `
        } else if (!(JSON.parse(localStorage.getItem('user')).userId == 1)) {

            document.querySelector("#app").innerHTML = `
        <div class="container" style="text-align: center;padding: 50px 0px;">
            <h6>Bạn không có quyền truy cập trang này !</h6>
            <p><a href="/">Quay lại trang chủ</a></p>
            <p><button style="font-size: 14px;padding: 2px 10px;" id="btn_logout">Đăng xuất</button></p>
        </div>
        `
        } else {
            router.on({
                // Admin
                "/admin": () => view(home_admin),
                "/admin/user/edit": () => view(edit_user),
                // Post
                "/admin/post": () => view(list_post_page),
                "/admin/post/add": () => view(add_post_page),
                "/admin/post/edit/:id": (data) => {
                    const id = data.data.id
                    view(edit_post, id)
                },
                // Pro
                "/admin/project": () => view(list_project_page),
                "/admin/project/add": () => view(add_project_page),
                "/admin/project/edit/:id": (data) => {
                    const id = data.data.id
                    view(edit_project_page, id)
                },
                // Cate_pro
                "/admin/categoryproject": () => view(cate_pro_page),
                "/admin/categoryproject/add": () => view(add_cate_pro_page),
                "/admin/categoryproject/edit/:id": (data) => {
                    const id = data.data.id
                    view(edit_cate_pro_page, id)
                },
                "/admin/categoryproject/detail/:id": (data) => {
                    const id = data.data.id
                    view(detail_cate_pro, id)
                },
                // Cate_post
                "/admin/categorypost": () => view(cate_post_page),
                "/admin/categorypost/detail/:id": (data) => {
                    const id = data.data.id
                    view(detail_cate_post, id)
                },
                "/admin/categorypost/add": () => view(add_cate_post_page),
                "/admin/categorypost/edit/:id": (data) => {
                    const id = data.data.id
                    view(edit_cate_post_page, id)
                },
                // User
                "/admin/user": () => view(user_page),
            })
        }


        if (document.getElementById("btn_logout")) {
            document.getElementById("btn_logout").addEventListener("click", function() {
                localStorage.removeItem('user');
                location.href = "/admin"
            })
        }
    }





    router.resolve()
})