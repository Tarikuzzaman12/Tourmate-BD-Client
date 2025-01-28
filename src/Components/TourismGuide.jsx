import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router-dom';
import PackageCard from './PackageCard';
import GuideCard from './GuideCard';

const TourismGuide = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  // Fetch random packages
  useEffect(() => {
    fetch('https://tour-mate-bd-server-site.vercel.app/packages/random')
      .then(res => res.json())
      .then(data => setPackages(data));
  }, []);

  // Fetch random guides
  useEffect(() => {
    fetch('https://tour-mate-bd-server-site.vercel.app/guides')
      .then(res => res.json())
      .then(data => setGuides(data));
  }, []);

  return (
    <div className="container mx-auto my-8">
      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        {/* Packages Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages?.map(pkg => (
              <PackageCard key={pkg._id} pkg={pkg} /> // Use PackageCard here
            ))}
          </div>
        </TabPanel>

        {/* Guides Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map(guide => (
              <GuideCard key={guide._id} guide={guide} /> // Use GuideCard here
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismGuide;
