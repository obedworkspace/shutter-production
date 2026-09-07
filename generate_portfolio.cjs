const fs = require('fs');

const rawData = `
COMMERCIALS: 

https://youtu.be/y4z0wVTi-ko?si=wW-MPt8tiwDjRsV2 
https://youtu.be/XFBdBzwXbk4?si=ArdsWDRYYonHvBzu 
https://youtu.be/TKsKVoyp8fg?si=Y5G4_nAMaVmooGv9 
https://youtu.be/GuMUYlnq0Zs?si=-qynEix0ro9UA4tb  
https://youtu.be/HWClrASIpb0?si=JtLyhNTL_ol4_Aol 
https://youtu.be/3ZjzWQftoE0?si=-pD-8ajUlXmJ49wu 
https://youtu.be/AQflVjPk3nA?si=_8JqMdxrvsc2FJZW

CORPARATE: 

https://www.youtube.com/live/A6v9EEvZdCU?si=DK1VCSF4MLavae1Z 
https://www.youtube.com/live/GcunWeFi9Yw?si=uxEYPCHNx6y4NLFa 
https://www.youtube.com/live/YB_QEB7V7UY?si=ikIu__5WGQJTPBhu 
https://youtu.be/fVRmwPBvKqM?si=O2HaK2mmeBySfwxK 
https://www.youtube.com/live/fn0t71SdO1Y?si=s3Z1klPY3kApS_2Y 
https://www.youtube.com/live/fn0t71SdO1Y?si=urmsLHXYuUL_35Pn 
https://youtu.be/S3GyVEImvcQ?si=tUFEil1XGJ4AAFx2 
https://youtu.be/8ELEY_i9ZAg?si=4rDfW94zIJ4CAkXm 
https://youtu.be/bOGHAWWnvp4?si=X21Ra5OP_Ds7pe7V 
https://youtu.be/HFq6zIJcV70?si=dCNbsIGFODAClvWz 
https://youtu.be/gnNTU05KOSc?si=EdATzuFQtLrc-9Pd
https://youtu.be/7yadiIS_af0?si=Md6_S4yD13bJ177T 
https://youtu.be/1Ylez60uUBk?si=9HzSoYblG6ackMe1 

DOCUMENTARY: 

https://youtu.be/OU8WlwmZt8Y?si=jWZpoEeRbh3sP7Rc 
https://youtu.be/wQHgpZl3jPM?si=JMdoyqI8l7r1JX6W  
https://youtu.be/a9OXIPJvRVY?si=cvesfZdTr19YwzyI
https://youtu.be/ZiQGm-keQMk
https://youtu.be/ceFGBQ_Ae3Q
https://youtu.be/ONrXo2hv2Ao?si=w37R0uSISlzNozq8
https://youtu.be/oBDvtRmx4-Y?si=PqWMVbLlZnOx8T01     
https://youtu.be/ZeST_T6RATM?si=J8Ix7EdfpMdE9eXa             
https://youtu.be/G5XaWQJQdns?si=_fFloHJ5PCo7G64A
https://youtu.be/Uz7Hnv1Elsg?si=es-jLQoHbD5njrg4 
https://youtu.be/YSIwd0m2Hdo?si=qC2299_sKz3khRA0  
https://youtu.be/ZZcTiHgf5eo?si=C4U87n8-BMN293F9 
https://youtu.be/J4tgpEVxpyw?si=00kyCBS_FvEGLup1 
https://youtu.be/h4sfxGPfFgA?si=IfOq7Y5MhIz31Unq 
https://youtu.be/H7fOBkxcqJA?si=nwt4odl_XAzIGvVx          
https://youtu.be/5gJvgTmOlEk?si=DcBmqmvsPBNbo7vH
https://youtu.be/pHVo9KLJGiI?si=ckiSnbat-orgy8u0
https://youtu.be/BcJD0JPi_R0?si=J0dTw1SFUiyjJye- 
https://youtu.be/VQvWD1K3atk?si=ae7N47U2c6weHy4i 
https://youtu.be/WCzkigH5sNQ?si=wTCPGNkYuawk2s3x
https://youtu.be/zpp8brW2BMk?si=6UMikvjqZplFu922 
https://youtu.be/zpp8brW2BMk?si=lWXCWX2TFr351C8l
`;

const categories = {
    'COMMERCIALS': 'Commercial',
    'CORPARATE': 'Corporate',
    'DOCUMENTARY': 'Documentary'
};

let currentCategory = '';
const items = [];
let idCounter = 1;
const seenIds = new Set();

rawData.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;

    const catMatch = Object.keys(categories).find(c => line.startsWith(c));
    if (catMatch) {
        currentCategory = categories[catMatch];
        return;
    }

    if (line.startsWith('http')) {
        let videoId = '';
        if (line.includes('youtu.be/')) {
            videoId = line.split('youtu.be/')[1].split('?')[0];
        } else if (line.includes('youtube.com/live/')) {
            videoId = line.split('youtube.com/live/')[1].split('?')[0];
        }

        if (videoId && !seenIds.has(videoId)) {
            seenIds.add(videoId);
            items.push({
                id: idCounter,
                title: `${currentCategory} Video ${items.filter(i => i.category === currentCategory).length + 1}`,
                category: currentCategory,
                thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                videoUrl: `https://www.youtube.com/embed/${videoId}`,
                duration: "TBD",
                description: `A selection from our ${currentCategory.toLowerCase()} portfolio.`
            });
            idCounter++;
        }
    }
});

const fileContent = `export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    videoUrl?: string;
    duration: string;
    description: string;
    isImage?: boolean;
}

export const portfolioItems: PortfolioItem[] = ${JSON.stringify(items, null, 4)};\n`;

fs.writeFileSync('./src/data/portfolioVideos.ts', fileContent);
console.log('Successfully generated src/data/portfolioVideos.ts');
