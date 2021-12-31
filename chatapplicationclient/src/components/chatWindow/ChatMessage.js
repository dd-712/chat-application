import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatMessage(props) {

    const [user, setuser] = useState('receiver');
    const [msgType, setMsgType] = useState('msg');

    return (
        <div>
            <div className={`msg ${user}`} >
                <div className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus nunc accumsan tincidunt rutrum. Proin viverra, nunc a hendrerit facilisis, lectus sapien dapibus urna, ut consequat mi mi vitae leo. Nunc sed velit ac lectus pellentesque dictum. Vestibulum venenatis, quam nec commodo sagittis, ipsum ipsum mattis arcu, at consequat erat mi ut quam. Donec vehicula, sapien a malesuada volutpat, nunc risus lacinia mi, vitae volutpat odio ex et lorem. Maecenas varius metus sed lacinia gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id tincidunt justo.</div>
                <div className='time'> time</div>
            </div >
            <div className={`msg ${user}`} >
                <div className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus nunc accumsan tincidunt rutrum. Proin viverra, nunc a hendrerit facilisis, lectus sapien dapibus urna, ut consequat mi mi vitae leo. Nunc sed velit ac lectus pellentesque dictum. Vestibulum venenatis, quam nec commodo sagittis, ipsum ipsum mattis arcu, at consequat erat mi ut quam. Donec vehicula, sapien a malesuada volutpat, nunc risus lacinia mi, vitae volutpat odio ex et lorem. Maecenas varius metus sed lacinia gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id tincidunt justo.</div>
                <div className='time'> time</div>
            </div >
            <div className={`msg ${user}`} >
                <div className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus nunc accumsan tincidunt rutrum. Proin viverra, nunc a hendrerit facilisis, lectus sapien dapibus urna, ut consequat mi mi vitae leo. Nunc sed velit ac lectus pellentesque dictum. Vestibulum venenatis, quam nec commodo sagittis, ipsum ipsum mattis arcu, at consequat erat mi ut quam. Donec vehicula, sapien a malesuada volutpat, nunc risus lacinia mi, vitae volutpat odio ex et lorem. Maecenas varius metus sed lacinia gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id tincidunt justo.</div>
                <div className='time'> time</div>
            </div >
        </div>

    );
}

export default ChatMessage;