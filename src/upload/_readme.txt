Following are steps followed from youtube video below
https://www.youtube.com/watch?v=tEZERHLge-U

Install Dependencies
  > yarn add multer - installs multer
    The multer modules handles the form data that is being sent to the server
    when we send a post request over http, and send that multi-part data format.
    Multer will parse the incoming request and gives a buffer we can actually 
    use to upload to different services, S3 being one of them.

  > yarn add @types/multer - installs multer type defintions

  > Set up the upload route, in the upload controller, to be able to parse a 
    multipart file using multer

  > Use ParseFilePipeBuilder to provide file valiation options.
    NOTE: I was not able to use ParseFilePipeBuilder Pipe because it was introduced 
      in nestjs version 9 and I am running version. This pipe allows you 
      set up file validations.

  > yarn add @aws-sdk/client-s3  - installs aws sdk s3 client

  > yarn add @nestjs/config  -  installs config so we can store our aws credentials

  > implement the upload service - which does the actual upload to S3

  > yarn add @nestjs/throttler - used for rate limiting purposes to prevent brute force attack

  > update the upload.module with the throttler and config parameters
  > update the upload.module by adding the throttler guard to the providers list