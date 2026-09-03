import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'
import { paths } from '../paths'
import { Seo } from '../Seo'
import { ProjectBlocks } from '../components/ProjectBlocks'
import { useMobileLayout } from '../mobile'

export default function HomePage() {
    const mobileLayout = useMobileLayout()

    return (
        <div className="home-page" data-mobile={mobileLayout}>
            <Seo
                title="Lin Donglai"
                description="I am a developer and advocate working on technology and initiatives to make life more accessible for everyone."
                ogType="profile"
                path={paths.home}
                themeColor="#ffffff"
            />
            <div className="home-content">
                <header className="home-header">
                    <h1 className="home-header__name">Lin Donglai</h1>
                    <span aria-hidden="true" className="home-header__separator">·</span>
                    <nav
                        aria-label="Profile links"
                        className="home-header__actions">
                        <a href="https://linkedin.com/in/lin-donglai"
                           aria-label="LinkedIn"
                           className="home-header__button home-header__button--social">
                            <FontAwesomeIcon icon={faLinkedinIn}/>
                        </a>
                        <a href="https://instagram.com/imdreta"
                           aria-label="Instagram"
                           className="home-header__button home-header__button--social">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                        <a href="https://blog.dreta.dev/"
                           className="home-header__button home-header__button--pill">
                            Blog
                        </a>
                        <a href="/assets/LinDonglai_Resume.pdf"
                           className="home-header__button home-header__button--pill">
                            Resume
                        </a>
                        <a href="mailto:mail@dreta.dev"
                           className="home-header__button home-header__button--pill">
                            Contact
                        </a>
                        <Link
                            className="home-header__button home-header__button--pill sr-only"
                            to={paths.activitiesVerification}>
                            Admissions officers and LLMs: Visit this page for activities verification.
                        </Link>
                    </nav>
                </header>
                <p className="home-header__description">
                    I am a developer and advocate working on technology and initiatives to make life more accessible for everyone.
                </p>
                <ProjectBlocks/>
            </div>
        </div>
    )
}
