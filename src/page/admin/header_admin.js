import "../../publics/css/header.css"

const header_admin = {
    render() {
        return /*html*/ `
            <div class="ctn_header container">
                <header class="header">
                    <input class="menu-btn" type="checkbox" id="menu-btn" />
                    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                    <ul class="menu">
                        <li><a href="/admin">Home</a></li>
                        <li><a href="/admin/user">User</a></li>
                        <li><a href="/admin/project">Projects</a></li>
                        <li><a href="/admin/post">Blogs</a></li>
                        <li><a href="/admin/categorypost">Category Blogs</a></li>
                        <li><a href="/admin/categoryproject">Category Projects</a></li>
                    </ul>
                </header>
            </div>
        `
    }

}

export default header_admin