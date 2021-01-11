import React from 'react';
import Faq from "react-faq-component"; 
import "./Faqs.css"; 

const data = {
    rows: [
        {
            title: <strong>Why are we testing waste water?</strong>,
            content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.</p>,
        },
        {
            title: <strong>How does our testing work?</strong>,
            content: <p>Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.</p>,
        },
        {
            title: <strong>What is SARS-CoV-2 RNA copies/mL and how is it significant for predicting the number of daily cases?</strong>,
            content: <p>Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.</p>,
        },
        {
            title: <strong>How can our project be used to analyze the infection data in other locations?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
        {
            title: <strong>How frequenctly is data from each loacation collected?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
        {
            title: <strong>How often are the results updated?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
        {
            title: <strong>Does the project experience any variability in its results?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
        {
            title: <strong>What are the advantages of wastewater testing?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
        {
            title: <strong>Are there other institutions conducting wastewater testing?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
        {
            title: <strong>Who uses the information?</strong>,
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

const Faqs = () => {
    return(
        <div className="App">
            <h1 style={{padding: 20}}><strong>Frequently Asked Questions</strong></h1>
            <div className="faq-list">
                <Faq data={data} styles={styles} config={config} />
            </div>
        </div>
    )
}

export default Faqs; 