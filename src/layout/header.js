import "../publics/css/header.css"

const header = {
    render() {
        return /*html*/ `
            <div class="ctn_header container">
                <header class="header">
                    <input class="menu-btn" type="checkbox" id="menu-btn" />
                    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                    <ul class="menu">
                        <li><a href="/">Home</a></li>
                        <li><a href="/project">Project</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </header>
            </div>
        `
    }

}

export default header