// import { searchUser } from '@/actions/sidafa';
// import React from 'react';
// import { AutoComplete } from './auto-complete';

// const TabunganPage = async () => {
//     // const name = await searchUser('');
//     // console.log(name);
//     return (
//         <div>
//             <AutoComplete />
//         </div>
//     );
// };

// export default TabunganPage;

import React from 'react';
import { AutoComplete } from './auto-complete';

async function TabunganPage() {
    return (
        <div>
            <AutoComplete />
        </div>
    );
}

export default TabunganPage;
