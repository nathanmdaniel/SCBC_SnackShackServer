import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from 'next/link';

class CheckOutMenuItem extends React.Component {
	render() {
	    return(
            <Link href="/CheckOutPage">
			    <ListItem button>
			      <ListItemIcon>
				    <SvgIcon viewBox="0 0 32 32" title="Icon made by https://freeicons.io/profile/714">
                        <path d="M22.1851633,20.1270029 L20,22 L20,22 L25.9230769,27.0769231 L25.9230769,27.0769231 L25.1153846,27.8846154 L19.1195568,22.7453344 L13.8961462,22.7681253 L13.875,22.75 L7.88461538,27.8846154 L7.07692308,27.0769231 L7.07692308,27.0769231 L13,22 L10.8148367,20.1270029 L7,16.9000244 L7,11.36 L4,14 L4,28.0059397 C4,29.1072288 4.88976324,30 6.00359486,30 L26.9964051,30 C28.10296,30 29,29.1054862 29,28.0059397 L29,14 L29,14 L26,11.36 L26,16.9000244 L22.1851633,20.1270029 L22.1851633,20.1270029 L22.1851633,20.1270029 Z M13.0909091,6 L16.5,3 L19.9090909,6 L13.0909091,6 L13.0909091,6 L13.0909091,6 Z M8.9999602,7 C8.44769743,7 8,7.44373571 8,8.00207596 L8,16.2000122 L14.2521973,21.5159302 L18.671936,21.5159302 L25,16.2000122 L25,8.00207596 C25,7.44864469 24.5452911,7 24.0000398,7 L8.9999602,7 L8.9999602,7 Z" />
				    </SvgIcon>
			      </ListItemIcon>
			      <ListItemText primary="Check Out" />
			    </ListItem>
            </Link>
		);
	}
}

export default CheckOutMenuItem;