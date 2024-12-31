import React, { useState, useEffect} from 'react'
import './Footer.scss';
import { client, urlFor } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';
import { motion } from 'framer-motion'
import { images } from '../../constants';
const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false)

  const { name, email, message} = formData;

  const handleChangeInput = (e) => {
    const { name, value} = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
    .then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }

  return (
    <>
      <h2 className='head-text'>Contact us <span>we ready at </span>your service!</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.whatsapp3} alt='whatsapp'></img>
          <a href='tel: +2349130448907' className='p-text'>+2349130448907</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile'></img>
          <a href='tel: +9130448907' className='p-text'>+2349130448907</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.email} alt='email'></img>
          <a href='mailto:aniesodoc@gmail.com' className='p-text'>aniesodoc@gmail.com</a>
        </div>
      </div>
      {! isFormSubmitted  ? 
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} required/>
        </div>
        <div className='app__flex'>
          <input className='p-text' type='email' placeholder='Your email' name='email' value={email} onChange={handleChangeInput} required/>
        </div>
        <div>
          <textarea
          className='p-text'
          placeholder='Your Message'
          value={message}
          name='message'
          onChange={handleChangeInput}
          required
          />
        </div>
        <button type='button' className='p-text' onClick={handleSubmit} required>{loading ? 'Sending...' : 'Send message'}</button>
      </div>
      : <div>
        <h3 className='head-text'>Thank you for getting in touch</h3>
        </div>}
    </>
  )
}

export default AppWrap( 
  MotionWrap(Footer, 'app__footer'),
  'contact', "app__whitebg");