import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log('Upload request received...');
    
    const formData = await req.formData();
    console.log('FormData received, fields:', Array.from(formData.keys()));
    
    console.log('Forwarding to S3 server...');
    
    // S3 серверт хүсэлт илгээх
    const uploadRes = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('S3 server response status:', uploadRes.status);
    console.log('S3 server response headers:', Object.fromEntries(uploadRes.headers.entries()));

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error('S3 upload error response:', errorText);
      return NextResponse.json({ 
        error: 'S3 сервер алдаа буцаасан: ' + uploadRes.status + ' - ' + errorText.substring(0, 200)
      }, { status: 500 });
    }

    // Content-Type шалгах
    const contentType = uploadRes.headers.get('content-type');
    console.log('Response content-type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await uploadRes.text();
      console.error('S3 server returned non-JSON response:', responseText.substring(0, 500));
      return NextResponse.json({ 
        error: 'S3 сервер JSON биш хариу буцаасан. Content-Type: ' + contentType
      }, { status: 500 });
    }

    // S3 серверийн хариуг буцаах
    let uploadData;
    try {
      const responseText = await uploadRes.text();
      console.log('S3 server raw response:', responseText);
      
      uploadData = JSON.parse(responseText);
      console.log('S3 server parsed response data:', uploadData);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({ 
        error: 'S3 серверээс JSON биш хариу ирлээ. Response: ' + responseText.substring(0, 500)
      }, { status: 500 });
    }
    
    // S3 серверээс URL шалгах
    if (!uploadData.url) {
      return NextResponse.json({ 
        error: 'S3 серверээс URL буцаагүй байна. Response: ' + JSON.stringify(uploadData)
      }, { status: 500 });
    }

    return NextResponse.json(uploadData);
    
  } catch (error) {
    console.error('Upload proxy error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ 
      error: 'Upload үед алдаа гарлаа: ' + error.message,
      details: error.stack
    }, { status: 500 });
  }
}
