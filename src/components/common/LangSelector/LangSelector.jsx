import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { RuFlag, EnFlag, DeFlag } from "../../../assets/image/LangFlags"
import "./LangSelector.scss"

const LangFlag = ({ lang, ...props }) => {
    switch (lang) {
        case "ru":
            return <RuFlag {...props} />
        case "en":
            return <EnFlag {...props} />
        case "de":
            return <DeFlag {...props} />
        default:
            return <EnFlag {...props} />
    }
}

const langsList = ["ru", "en", "de"]

const moveItemToTop = (arr, value) => {
    if (!value) return arr
    let index = arr.indexOf(value)
    if (index > -1) {
        arr.splice(index, 1)
    }
    arr.unshift(value)
    console.log(arr)
    return arr
}

const LangSelector = ({ currentLang, selectLang, ...props }) => {
    const [isOpened, setOpened] = React.useState(false)

    const styles = classNames({ "lang-selector": true, "--opened": isOpened })

    return (
        <div onClick={() => setOpened(!isOpened)} className={styles} {...props}>
            <div className='lang-selector__container'>
                <div className='lang-selector__row'>
                    {moveItemToTop(langsList, currentLang).map((lang) => (
                        <div
                            className='lang-selector__item'
                            onClick={() => selectLang(lang)}
                            key={lang}
                        >
                            <LangFlag
                                className='lang-selector__flag'
                                lang={lang}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// const LangSelector = ({ currentLang, selectLang, ...props }) => {
//     const [isOpened, setOpened] = React.useState(false)

//     // let SelectedFlag
//     // let OtherLangs = []

//     // React.useEffect(() => {

//     //     for (const { lang, Flag } of langsList) {

//     //         if (lang === currentLang) SelectedFlag = Flag

//     //         else OtherLangs.push({ lang, Flag })
//     //     }
//     // }, [currentLang])

//     const styles = classNames({ "lang-selector": true, "--opened": isOpened })

//     return (
//         <div onClick={() => setOpened(!isOpened)} className={styles} {...props}>
//             <div className='lang-selector__container'>
//                 <div className='lang-selector__row'>
//                     <div className='lang-selector__item --selected'>
//                         {langsList.filter(
//                             ({ lang, Flag }) => lang === currentLang
//                         )}
//                         {<SelectedFlag className='lang-selector__flag' />}
//                     </div>
//                     {OtherLangs.map(({ lang, Flag }) => (
//                         <div
//                             onClick={() => selectLang(lang)}
//                             className='lang-selector__item'
//                             key={lang}
//                         >
//                             <Flag className='lang-selector__flag' />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

LangSelector.propTypes = {
    currentLang: PropTypes.string,
    selectLang: PropTypes.func,
}

export { LangSelector }
