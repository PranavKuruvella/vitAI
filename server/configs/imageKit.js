import ImagieKit from '@imagekit/nodejs';

const imageKit = new ImagieKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

export default imageKit;