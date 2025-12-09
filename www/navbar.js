$(document).ready(function(){

    const nav = `
    <nav class="navbar navbar-dark sticky-top shadow" style="background: var(--bs-purple);">

        <div class="container-fluid">

            <a class="navbar-brand" href="#">
                <i class="fas fa-shopping-basket"></i> Sms Ofertas
            </a>

            <button class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-1">
                <span class="visually-hidden">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navcol-1" class="collapse navbar-collapse">

                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">First Item</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Second Item</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Third Item</a>
                    </li>
                </ul>

            </div>

        </div>

    </nav>    
    `;

    $(nav).prependTo('body');

});