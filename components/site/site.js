// @flow
import React, { Fragment } from "react";

import { Text } from "@shoutem/ui";

import Address from "../../models/address";

type SitePropsType = { site: Object, town: Object };


export const Site = ({ site, town }: SitePropsType) => (
    <Fragment>
        <Text>{ (town || {}).townName }</Text>
        <Text>{ (site || {}).name }</Text>
        <Text>{ Address.toString((site || {}).address) }</Text>
        <Text>{ (site || {}).notes }</Text>
        <Text>{ (town || {}).dropOffInstructions }</Text>
    </Fragment>
);
