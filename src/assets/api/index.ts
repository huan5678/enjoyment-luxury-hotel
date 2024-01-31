import Cookies from 'js-cookie';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFlMDRkYzE0ZjM5NmUwNTlhOWM3M2EiLCJpYXQiOjE3MDYyMDE1ODksImV4cCI6MTcwNjgwNjM4OX0.34299tu2787_3J0RG7lJ4dZpiCQNyNcOPkuNXqnbUAk';

export async function getUser() {
  const res = await fetch(`${baseUrl}/api/v1/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  // next.js 會噴 重複呼喚 res.json() 的錯，所以又再宣告變數了一次
  const data = await res.json();
  if (data.token) Cookies.set('token', data.token);
  return data;
}

export async function updateUser(data: MemberUpdateData) {
  const res = await fetch(`${baseUrl}/api/v1/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.token) Cookies.set('token', response.token);
  return response;
}

export async function getOrders() {
  const res = await fetch(`${baseUrl}/api/v1/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function deleteOrder(id: string) {
  const res = await fetch(`${baseUrl}/api/v1/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function userLogin(data: UserLoginData) {
  const res = await fetch(`${baseUrl}/api/v1/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.token) Cookies.set('token', response.token);
  return response;
}

export async function userRegister(data: UserRegisterData) {
  const res = await fetch(`${baseUrl}/api/v1/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.token) Cookies.set('token', response.token);
  return response;
}

export async function verifyEmail(email: string) {
  const res = await fetch(`${baseUrl}/api/v1/verify/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function apiCheckUserIsLogin() {
  const res = await fetch(`${baseUrl}/api/v1/user/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const response = await res.json();
  if (response.token) Cookies.set('token', response.token);
  return response;
}

export async function apiGetNews() {
  const res = await fetch(`${baseUrl}/api/v1/home/news/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function apiGetRoomType() {
  const res = await fetch(`${baseUrl}/api/v1/rooms/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function apiGetCulinary() {
  const res = await fetch(`${baseUrl}/api/v1/home/culinary/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getRoomDetail(roomId: string) {
  const res = await fetch(`${baseUrl}/api/v1/rooms/${roomId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function postOrder(data: OrderPostData) {
  const res = await fetch(`${baseUrl}/api/v1/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}


export async function getOrderDetail(orderId: string) {
  const res = await fetch(`${baseUrl}/api/v1/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}