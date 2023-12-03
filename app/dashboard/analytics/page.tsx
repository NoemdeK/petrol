'use client';
import { Analytics } from '@/components/analytics';
import { chartAllRegionAGO } from '@/redux/AGO.slice';
import { chartAllRegionDPK } from '@/redux/DPK.slice';
import { chartAllRegionLPG } from '@/redux/LPG.slice';
import { chartAllRegionPMS } from '@/redux/PMS.slice';
import { fetchPetrolPrice } from '@/redux/petrol.slice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPetrolPrice());
    dispatch(chartAllRegionDPK());
    dispatch(chartAllRegionAGO());
    dispatch(chartAllRegionLPG());
    dispatch(chartAllRegionPMS());
  }, [dispatch]);

  return <Analytics />;
};

export default Page;
