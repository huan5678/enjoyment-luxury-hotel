'use client';

import { Fragment, useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import moment from 'moment';

import { KeyboardArrowDown } from '@mui/icons-material';
import { Grid, Typography, Stack, Box, Button, Divider, Container, Link } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { calculateStayDays, formatDate, formatNTD } from '@/utils';
import { useWidth } from '@/hooks';

import ModalController from './ModalController';
import Headline from '@/components/common/Headline';
import Card from '@/components/common/Card';
import { getOrders } from '@/assets/api';
import { IOrder } from '@/types';

const MAX_ORDERS_DISPLAY = 5;

const Page = () => {
  const [data, setData] = useState<IOrder[]>([]);
  const [targetOrder, setTargetOrder] = useState<IOrder | undefined>({} as IOrder);
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const [displayedOrders, setDisplayedOrders] = useState(MAX_ORDERS_DISPLAY);

  const handleShowMore = () => {
    setDisplayedOrders((prev) => prev + MAX_ORDERS_DISPLAY);
  };

  const handleGetOrder = async () => {
    await getOrders().then((res) => {
      if (Array.isArray(res.result)) {
        const data = res.result.filter((item) => item.status === 0);
        setData(data as IOrder[]);
      }
    });
  };

  const handleRefreshTargetOrder = () => {
    setTargetOrder(undefined);
    handleGetOrder();
  };

  useEffect(() => {
    handleGetOrder();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // 將字串日期轉換為日期物件
      const parseDate = (dateStr: string) => moment(dateStr);

      // 獲取現在的時間
      const now = new Date().getTime();
      // 篩選出未來的訂單
      const futureOrders = data.filter((order) => order.checkInDate && moment(order.checkInDate) > moment());

      const closestOrder = futureOrders.reduce((prev, curr) => {
        const prevDiff = parseDate(prev.checkInDate).valueOf() - now;
        const currDiff = parseDate(curr.checkInDate).valueOf() - now;
        return prevDiff < currDiff ? prev : curr;
      }, futureOrders[0]);
      setTargetOrder(closestOrder);
    }
  }, [data]);

  return (
    <Suspense>
      <Container sx={{ paddingBottom: isSmallDevice ? '2.5rem' : '7.5rem' }}>
        <Grid
          container
          direction={{ sm: 'column', md: 'row' }}
          justifyContent={'space-between'}
          gap={{ sm: '1.5rem', md: '2.5rem' }}
          wrap={'nowrap'}>
          {data.length > 0 ? (
            <>
              <Grid item md={7} position={'relative'}>
                {targetOrder && (
                  <Card
                    padding={isSmallDevice ? 'md' : 'lg'}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: isSmallDevice ? '1.5rem' : '2.5rem',
                      alignItems: 'stretch',
                      position: 'sticky',
                      top: 0,
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
                        <Headline
                          variant={isSmallDevice ? 'subtitle1' : 'title'}
                          title={`入住：${formatDate(targetOrder.checkInDate, '15:00 可入住')}`}
                        />
                        <Headline
                          variant={isSmallDevice ? 'subtitle1' : 'title'}
                          secondary
                          title={`退房：${formatDate(targetOrder.checkOutDate, '12:00 前退房')}`}
                        />
                      </Stack>
                      <Typography variant={'subtitle1'}>{`NT$ ${formatNTD(targetOrder.roomId?.price)}`}</Typography>
                    </Stack>
                    <Divider />
                    <Stack flexDirection={'column'} gap={'1.5rem'}>
                      <Headline variant={isSmallDevice ? 'subtitle1' : 'title'} title={'房內設備'} />
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
                      <Headline variant={isSmallDevice ? 'subtitle1' : 'title'} title={'備品提供'} />
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
                    {targetOrder && (
                      <ModalController
                        isSmallDevice={isSmallDevice}
                        targetOrder={targetOrder}
                        id={targetOrder?._id as string}
                        handleRefreshTargetOrder={handleRefreshTargetOrder}
                      />
                    )}
                  </Card>
                )}
              </Grid>
              <Grid item md={5} position={'relative'}>
                <Card
                  padding={isSmallDevice ? 'md' : 'lg'}
                  sx={{
                    position: 'sticky',
                    top: 0,
                  }}>
                  <Typography
                    variant={isSmallDevice ? 'title' : 'h5'}
                    component="h3"
                    mb={{ sm: '1.5rem', md: '2.5rem' }}>
                    {'歷史訂單'}
                  </Typography>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={isSmallDevice ? '1.5rem' : '2.5rem'}
                    alignItems={'stretch'}
                    maxHeight={'100vh'}
                    sx={{ overflowY: 'auto' }}>
                    {data.length > 0 &&
                      data.slice(0, displayedOrders).map((order, index) => (
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
                                flexShrink: 0,
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
                                  order.checkInDate.toLocaleString(),
                                  order.checkOutDate.toLocaleString(),
                                )} 晚`}</Typography>
                                <Typography
                                  variant={
                                    isSmallDevice ? 'body2' : 'body1'
                                  }>{`住宿人數：${order.peopleNum} 位`}</Typography>
                              </Box>
                              <Headline
                                variant={isSmallDevice ? 'body2' : 'body1'}
                                title={`入住：${formatDate(order.checkInDate.toLocaleString())}`}
                              />
                              <Headline
                                variant={isSmallDevice ? 'body2' : 'body1'}
                                secondary
                                title={`退房：${formatDate(order.checkOutDate.toLocaleString())}`}
                              />
                              <Typography variant={isSmallDevice ? 'subtitle1' : 'title'}>{`NT$ ${formatNTD(
                                order.roomId?.price,
                              )}`}</Typography>
                            </Stack>
                          </Stack>
                          {index !== data.length - 1 && <Divider />}
                        </Fragment>
                      ))}
                  </Box>
                  {data.length > MAX_ORDERS_DISPLAY && displayedOrders < data.length && (
                    <Button
                      variant={'outlined'}
                      size={'large'}
                      endIcon={<KeyboardArrowDown />}
                      onClick={handleShowMore}>
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
    </Suspense>
  );
};

export default Page;
