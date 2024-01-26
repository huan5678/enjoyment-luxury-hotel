'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';

import { Grid, Typography, Stack, Box, Button, Divider, Container, Link } from '@mui/material';

import Card from '@/components/common/Card';

import { useWidth } from '@/hooks';

import CheckIcon from '@mui/icons-material/Check';
import { KeyboardArrowDown } from '@mui/icons-material';
import ModalController from './ModalController';

const MAX_ORDERS_DISPLAY = 5;

const MemberOrder = ({ data }: { data: Orders }) => {
  const [targetOrder, setTargetOrder] = useState<Order | undefined>({} as Order);
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const orderData = data;

  const [displayedOrders, setDisplayedOrders] = useState(MAX_ORDERS_DISPLAY);

  const handleShowMore = () => {
    setDisplayedOrders((prev) => prev + MAX_ORDERS_DISPLAY);
  };

  function calculateStayDays(checkInDate: string, checkOutDate: string) {
    if (!checkInDate || !checkOutDate) return;
    const checkIn = new Date(checkInDate).getTime();
    const checkOut = new Date(checkOutDate).getTime();
    return (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 將毫秒轉換為天
  }

  function formatDate(dateStr: string, timeStr?: string) {
    if (!dateStr) return;
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const date = new Date(dateStr);
    return `${date.getMonth() + 1} 月 ${date.getDate()} 日 ${days[date.getDay()]}${timeStr ? `，${timeStr}` : ''}`;
  }

  function formatNTD(num: number) {
    if (!num) return;
    return num.toLocaleString('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  useEffect(() => {
    if (orderData.length > 0) {
      // 將字串日期轉換為日期物件
      const parseDate = (dateStr: string) => new Date(dateStr);

      // 獲取現在的時間
      const now = new Date();

      // 篩選出未來的訂單
      const futureOrders = orderData.filter((order) => parseDate(order.checkInDate) > now);

      // 尋找離現在時間最近的訂單
      const closestOrder = futureOrders.reduce((prev, curr) => {
        const prevDiff = parseDate(prev.checkInDate).getTime() - now.getTime();
        const currDiff = parseDate(curr.checkInDate).getTime() - now.getTime();
        return prevDiff < currDiff ? prev : curr;
      });

      setTargetOrder(closestOrder);
    }
  }, []);

  return (
    <Container sx={{ paddingBottom: isSmallDevice ? '2.5rem' : '7.5rem' }}>
      <Grid
        container
        direction={{ sm: 'column', md: 'row' }}
        justifyContent={'space-between'}
        gap={{ sm: '1.5rem', md: '2.5rem' }}
        wrap={'nowrap'}>
        {orderData.length > 0 ? (
          <>
            <Grid item md={7}>
              {targetOrder && (
                <Card
                  padding={isSmallDevice ? 'md' : 'lg'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isSmallDevice ? '1.5rem' : '2.5rem',
                    alignItems: 'stretch',
                  }}>
                  <Box>
                    <Typography variant={isSmallDevice ? 'body2' : 'body1'} component="h3" mb={'0.5rem'}>
                      {`預訂參考編號： ${targetOrder._id}`}
                    </Typography>
                    <Typography variant={isSmallDevice ? 'title' : 'h5'}>{'即將來的行程'}</Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100vh',
                      maxHeight: isSmallDevice ? '9.375rem' : '15rem',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                    }}>
                    {targetOrder.roomId?.imageUrl && (
                      <Image
                        src={targetOrder.roomId?.imageUrl}
                        alt={targetOrder.roomId?.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                  <Stack direction={'column'} spacing={'1.5rem'}>
                    <Stack direction={'row'} spacing={'1rem'}>
                      <Typography variant={isSmallDevice ? 'subtitle1' : 'h6'}>
                        {`${targetOrder.roomId?.name}，${calculateStayDays(
                          targetOrder.checkInDate,
                          targetOrder.checkOutDate,
                        )} 晚`}
                      </Typography>
                      <Divider orientation="vertical" variant="middle" flexItem />
                      <Typography
                        variant={
                          isSmallDevice ? 'subtitle1' : 'h6'
                        }>{`住宿人數：${targetOrder.peopleNum} 位`}</Typography>
                    </Stack>
                    <Stack direction={'column'} spacing={'0.5rem'}>
                      <Box>
                        {/* //TODO: 帶樣式的標題 */}
                        <Typography variant={'title'}>{`入住：${formatDate(
                          targetOrder.checkInDate,
                          '15:00 可入住',
                        )}`}</Typography>
                      </Box>
                      <Box>
                        {/* //TODO: 帶樣式的標題 */}
                        <Typography variant={'title'}>
                          {`退房：${formatDate(targetOrder.checkOutDate, '12:00 前退房')}`}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant={'subtitle1'}>{`NT$ ${formatNTD(targetOrder.roomId?.price)}`}</Typography>
                  </Stack>
                  <Divider />
                  <Stack flexDirection={'column'} gap={'1.5rem'}>
                    <Box>
                      {/* //TODO: 帶樣式的標題 */}
                      <Typography variant={'subtitle1'}>{'房內設備'}</Typography>
                    </Box>
                    <Card
                      isBorder={true}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                      }}>
                      {targetOrder.roomId?.facilityInfo.map((facility, index) => (
                        <Stack flexDirection={'row'} gap={'0.5rem'} key={index}>
                          <CheckIcon color="primary" />
                          <Typography variant={isSmallDevice ? 'subtitle1' : 'title'}>{facility.title}</Typography>
                        </Stack>
                      ))}
                    </Card>
                  </Stack>
                  <Stack flexDirection={'column'} gap={'1.5rem'}>
                    <Box>
                      {/* //TODO: 帶樣式的標題 */}

                      <Typography variant={'subtitle1'}>{'備品提供'}</Typography>
                    </Box>
                    <Card
                      isBorder={true}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                      }}>
                      {targetOrder.roomId?.amenityInfo.map((facility, index) => (
                        <Stack flexDirection={'row'} gap={'0.5rem'} key={index}>
                          <CheckIcon color="primary" />
                          <Typography variant={isSmallDevice ? 'subtitle1' : 'title'}>{facility.title}</Typography>
                        </Stack>
                      ))}
                    </Card>
                  </Stack>
                  {targetOrder && <ModalController isSmallDevice={isSmallDevice} id={targetOrder?._id} />}
                </Card>
              )}
            </Grid>
            <Grid item md={5}>
              <Card
                padding={isSmallDevice ? 'md' : 'lg'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isSmallDevice ? '1.5rem' : '2.5rem',
                  alignItems: 'stretch',
                  maxHeight: '100vh',
                  overflowY: 'auto',
                }}>
                <Typography variant={isSmallDevice ? 'title' : 'h5'} component="h3">
                  {'歷史訂單'}
                </Typography>
                {orderData.length > 0 &&
                  orderData.slice(0, displayedOrders).map((order, index) => (
                    <Fragment key={order._id}>
                      <Stack
                        gap={'1.5rem'}
                        flexDirection={isSmallDevice ? 'column' : 'row'}
                        alignItems={'flex-start'}
                        onClick={() => setTargetOrder(order)}
                        sx={{ cursor: 'pointer' }}>
                        <Image
                          style={{
                            objectFit: 'cover',
                            borderRadius: '0.5rem',
                          }}
                          src={order.roomId?.imageUrl}
                          alt={order.roomId?.name}
                          objectFit="cover"
                          width={120}
                          height={80}
                        />
                        <Stack direction={'column'} gap={'1rem'}>
                          <Typography
                            variant={isSmallDevice ? 'body2' : 'title'}>{`預訂參考編號： ${order._id}`}</Typography>
                          <Typography variant={isSmallDevice ? 'subtitle1' : 'h6'} component="h4">
                            {order.roomId?.name}
                          </Typography>
                          <Box>
                            <Typography variant={isSmallDevice ? 'body2' : 'body1'}>{`住宿天數：${calculateStayDays(
                              order.checkInDate,
                              order.checkOutDate,
                            )} 晚`}</Typography>
                            <Typography
                              variant={
                                isSmallDevice ? 'body2' : 'body1'
                              }>{`住宿人數：${order.peopleNum} 位`}</Typography>
                          </Box>
                          <Box>
                            {/* //TODO: 帶樣式的標題 */}

                            <Typography variant={'body1'}>{`入住：${formatDate(order.checkInDate)}`}</Typography>
                          </Box>
                          <Box>
                            {/* //TODO: 帶樣式的標題 */}
                            <Typography variant={'body1'}>{`退房：${formatDate(order.checkOutDate)}`}</Typography>
                          </Box>
                          <Typography variant={isSmallDevice ? 'subtitle1' : 'title'}>{`NT$ ${formatNTD(
                            order.roomId?.price,
                          )}`}</Typography>
                        </Stack>
                      </Stack>
                      {index !== orderData.length - 1 && <Divider />}
                    </Fragment>
                  ))}
                {orderData.length > MAX_ORDERS_DISPLAY && displayedOrders < orderData.length && (
                  <Button variant={'outlined'} size={'large'} endIcon={<KeyboardArrowDown />} onClick={handleShowMore}>
                    {'查看更多'}
                  </Button>
                )}
              </Card>
            </Grid>
          </>
        ) : (
          <Grid item>
            <Typography variant={isSmallDevice ? 'title' : 'h5'} component="h3" mb={isSmallDevice ? '1rem' : '2rem'}>
              {'目前無訂單'}
            </Typography>
            <Link href="/rooms" underline={'hover'}>
              {'立即前往預訂'}
            </Link>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MemberOrder;