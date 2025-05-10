'use client';

import React, { useState, useRef, useEffect } from 'react';
import ContentEditable from "@/components/contentEditable";

export default function Page() {
    return <>
        {ContentEditable()}
    </>
}