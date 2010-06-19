/* This is the main information file for RASP 
	We could have a server which lists rasp servers.
	From that you can select which server
	and from that you can then get this information file

	This file should also be used for L18N (e.g. Language)

	TODO: Convert this to more pure single JSON struture for easier transport
*/

var RASP = {
	"server": "http://glidingforecast.on.net/",
	"d2times": ["0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900"],
	"locations": ['VIC', 'NSW', 'QLD', 'TAS', 'SA', 'WA', 'NT'],
	// Temporary for convenience !
	"groups": ['Thermal Parameters', "Wind Parameters", "Cloud Parameters", "Wave / upper level Parameters"],
	// Bad structure - should maybe have 'group' as a field of types and use a filter
};

RASP.types = [
	// Set location
	{
		text: "Location",
		items: [
			{
				"location": 'VIC',
				"text": "Victoria",
			},
			{
				"location": 'QLD',
				"text": "Queensland",
			},
		],
	},

	// Set day
	{
		text: "Day",
		items: [
			{
				"day": 'current',
				"text": "Today",
			},
		],
	},

	// FUTURE: Path predictions, Maps, Waypoints, etc.

	// Main view parameters
	{
		text: "Thermal Parameters",
		items: [
			{
				"rasp_id": "wstar_bsratio",
				"text": "Thermal Updraft Velocity & B/S Ratio",
				"description": "A composite plot displaying the Thermal Updraft Velocity contours in colors overlaid by a stipple representing the Buoyancy/Shear Ratio.  The stipple is heavy for B/S Ratios 0-4 and light for B/S Ratios 4-7.  The intent is to mark regions where a small B/S Ratio will make thermals difficult (or impossible) to work, though that depends upon pilot skill and circling radius"
			},
			{
				"rasp_id": "wstar",
				"text": "Thermal Updraft Velocity (W*)",
				"description": "Average dry thermal updraft strength near mid-BL height.  Subtract glider descent rate to get average vario reading for cloudless thermals.  Updraft strengths will be stronger than this forecast if convective clouds are present, since cloud condensation adds buoyancy aloft (i.e. this negects cloudsuck).  W* depends upon both the surface heating and the BL depth"
			},
			{
				"rasp_id": "hwcrit",
				"text": "Height of Critical Updraft Strength (Hcrit)",
				"description": "This parameter estimates the height at which the average dry updraft strength drops below 225 fpm and is expected to give better quantitative numbers for the maximum cloudless thermalling height than the BL Top height given above, especially when mixing results from vertical wind shear rather than thermals.  (Note: the present assumptions tend to underpredict the max. thermalling height for dry consitions.) In the presence of clouds the maximum thermalling height may instead be limited by the cloud base. Being for dry thermals, this parameter omits the effect of cloudsuck"
			},
			{
				"rasp_id": "dwcrit",
				"text": "Depth of Critical Updraft Strength (AGL Hcrit)",
				"description": "No description given for this parameter: please visit http://www.drjack.info/RASP/INFO/parameters.html for more information"
			},
			{
				"rasp_id": "hbl",
				"text": "BL Top",
				"description": "Height of the top of the mixing layer, which for thermal convection is the average top of a dry thermal.  Over flat terrain, maximum thermalling heights will be lower due to the glider descent rate and other factors.  In the presence of clouds (which release additional buoyancy aloft, creating cloudsuck) the updraft top will be above this forecast, but the maximum thermalling height will then be limited by the cloud base. Further, when the mixing results from shear turbulence rather than thermal mixing this parameter is not useful for glider flying.  NB: this BL Top is not the height where the Thermal Index (TI) is zero, which is a criteria used by many simple determinations of the BL top - instead, the RASP BL Top uses a more sophisticated BL Top criteria based on turbulent fluxes"
			},
			{
				"rasp_id": "dbl",
				"text": "BL Depth",
				"description": "Depth of the layer mixed by thermals or (vertical) wind shear.  This parameter can be useful in determining which flight direction allows better thermalling conditions when average surface elevations vary greatly in differing directions.  (But the same cautions mentioned under Height of BL Top also apply.)  It is also an important determinant of thermals strength (as is the Surface Heating)"
			},
			{
				"rasp_id": "bltopvariab",
				"text": "Thermal height uncertainty",
				"description": "No description given for this parameter: please visit http://www.drjack.info/RASP/INFO/parameters.html for more information"
			},
			{
				"rasp_id": "sfcshf",
				"text": "Sfc. Heating",
				"description": "Heat transferred into the atmosphere due to solar heating of the ground, creating thermals.  This parameter is an important determinant of thermals strength (as is the BL depth).  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "sfcsunpct",
				"text": "Normalized Sfc. Sun",
				"description": "The solar radiation reaching the surface.  A fraction of this radiation goes into heating the air (see the Surface Heating parameter, to which this parameter can be compared).  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "sfctemp",
				"text": "Sfc. Temperature",
				"description": "The temperature at a height of 2m above ground level.  This can be compared to observed surface temperatures as an indication of model simulation accuracy; e.g. if observed surface temperatures are significantly below those forecast, then soaring conditions will be poorer than forecast.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "sfcdewpt",
				"text": "Sfc. Dewpoint",
				"description": "The dew point temperature at a height of 2m above ground level.  This can be compared to observed surface dew point temperatures as an indication of model simulation accuracy; e.g. if observed surface dew point temperatures are significantly below those forecast, then BL cloud formation will be poorer than forecast.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation"
			}
		]
	},

	{
		text: "Wind Parameters",
		items: [
			{
				"rasp_id": "sfcwind",
				"text": "Sfc. Wind",
				"description": "The speed and direction of the wind at 10m above the ground.  Speed is depicted by different colors and direction by streamlines.  This parameter is obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "blwind",
				"text": "BL Avg. Wind",
				"description": "The speed and direction of the vector-averaged wind in the BL.  This prediction can be misleading if there is a large change in wind direction through the BL (for a complex wind profile, any single number is not an adequate descriptor!)"
			},
			{
				"rasp_id": "bltopwind",
				"text": "Wind at BL Top",
				"description": "The speed and direction of the wind at the top of the BL.  Speed is depicted by different colors and direction by streamlines"
			},
			{
				"rasp_id": "blwindshear",
				"text": "BL Wind Shear",
				"description": "The vertical change in wind through the BL, specifically the magnitude of the vector wind difference between the top and bottom of the BL.  Note that this represents vertical wind shear and does not indicate so-called shear lines (which are horizontal changes of wind speed/direction)"
			},
			{
				"rasp_id": "wblmaxmin",
				"text": "BL Max. Up/Down (Convergence)",
				"description": "Maximum grid-area-averaged extensive upward or downward motion within the BL as created by horizontal wind convergence.  Positive convergence is associated with local small-scale convergence lines (often called shear lines by pilots, which are horizontal changes of wind speed/direction) - however, the actual size of such features is much smaller than can be resolved by the model so only stronger ones will be forecast and their predictions are subject to much error.  If CAPE is also large, thunderstorms can be triggered.  Negative convergence (divergence) produces subsiding vertical motion, creating low-level inversions which limit thermalling heights.  This parameter can be noisy, so users should be wary.  For a grid resolution of 12km or better convergence lines created by terrain are commonly predicted - sea-breeze predictions can also be found for strong cases, though they are best resolved by smaller-resolution grids"
			}
		]
	},
	{
		text: "Cloud Parameters",
		items: [
			{
				"rasp_id": "zsfclcldif",
				"text": "Cu Potential",
				"description": "This evaluates the potential for small, non-extensive puffy cloud formation in the BL, being the height difference between the surface-based LCL (see below) and the BL top.  Small cumulus clouds are (simply) predicted when the parameter positive, but it is quite possible that the threshold value is actually greater than zero for your location so empirical evaluation is advised.  Clouds can also occur with negative values if the air is lifted up the indicated vertical distance by flow up a small-scale ridge not resolved by the model's smoothed topography"
			},
			{
				"rasp_id": "zsfclcl",
				"text": "Cu Cloudbase (Sfc.LCL) MSL",
				"description": "This height estimates the cloudbase for small, non-extensive puffy clouds in the BL, if such exist i.e. if the Cumulus Potential parameter (above) is positive or greater than the threshold Cumulus Potential empirically determined for your site.  The surface LCL (Lifting Condensation Level) is the level to which humid air must ascend before it cools enough to reach a dew point temperature based on the surface mixing ratio and is therefore relevant only to small clouds - unlike the below BL-based CL which uses a BL-averaged humidity.  However, this parameter has a theoretical difficulty and quite possibly that the actual cloudbase will be higher than given here - so perhaps this should be considered a minimum possible cloudbase"
			},
			{
				"rasp_id": "zsfclclmask",
				"text": "Cu Cloudbase where CuPotential>0",
				"description": "Combining the previous two parameters, this depicts the Cumulus Cloudbase only at locations where the Cumulus Potential parameter is positive.  This single plot can be used, instead of needing to look at both the Cumulus Potential and Cumulus Cloudbase plots, if the threshold Cumulus Potential empirically determined for your site approximately equals the theoretical value of zero.  For locations where the actual threshold is greater than zero, as is often the case, this depiction will over-estimate the extent of the cumulus region"
			},
			{
				"rasp_id": "zblcldif",
				"text": "OD Potential",
				"description": "This evaluates the potential for extensive cloud formation (OvercastDevelopment) at the BL top, being the height difference between the BL CL (see below) and the BL top.  Extensive clouds and likely OD are predicted when the parameter is positive, with OD being increasingly more likely with higher positive values.  OD can also occur with negative values if the air is lifted up the indicated vertical distance by flow up a small-scale ridge not resolved by the model's smoothed topography.  [This parameter is truncated at -10,000 for plotting.]"
			},
			{
				"rasp_id": "zblcl",
				"text": "OD Cloudbase (BL CL) MSL",
				"description": "This height estimates the cloudbase for extensive BL clouds (OvercastDevelopment), if such exist, i.e. if the OvercastDevelopment Potential parameter (above) is positive.  The BL CL (Condensation Level) is based upon the humidity averaged through the BL and is therefore relevant only to extensive clouds (OvercastDevelopment) - unlike the above surface-based LCL which uses a surface humidity.  [This parameter is truncated at 22,000 for plotting.] "
			},
			{
				"rasp_id": "zblclmask",
				"text": "OD Cloudbase where ODpotential>0",
				"description": "Combining the previous two parameters, this depicts the OvercastDevelopment (OD) Cloudbase only at locations where the OD Potential parameter is positive.  This single plot can be used, instead of needing to look at both the OD Potential and OD Cloudbase plots, if the threshold OD Potential empirically determined for your site approximately equals the theoretical value of zero"
			},
			{
				"rasp_id": "blcwbase",
				"text": "BL Explicitly-predicted CloudWater",
				"description": "This parameter is primarily for DrJack's use.  It predicts the cloud base of extensive clouds based on model-predicted formation of cloud water, giving the lowest height at which the predicted cloud water density is above a criterion value within the BL.  In theory it should be useful predicting OvercastDevelopment (OD) within the BL since it predicts extensive cloudiness, i.e. when BL clouds are predicted to extend over a full model gridcell volume.  However, the criterion to be used to indicate the presence of clouds is problematical since no single value reliably differentiates between mist and cloud concentrations.  This parameter has not yet been verified again actual conditions - comparision to flight observations will be needed to evaluate its usefulness"
			},
			{
				"rasp_id": "blcloudpct",
				"text": "BL Cloud Cover",
				"description": "This parameter provides an additional means of evaluating the formation of clouds within the BL and might be used either in conjunction with or instead of the other cloud prediction parameters.  It assumes a very simple relationship between cloud cover percentage and the maximum relative humidity within the BL.  The cloud base height is not predicted, but is expected to be below the BL Top height.  DrJack does not have a lot of faith in this prediction, since the formula used is so simple, and expects its predictions to be very approximate - but other meteorologists have used it and it is better than nothing.  Note: Since The the BL Cloud Cover, Cumulus Potential, and BL Extensive CloudBase are based upon fundamentally different model predictions -- respectively the predicted maximum moisture in the BL, the predicted surface moisture, and an explicit cloud-water prediction -- they can yield somewhat differing predictions, e.g. the Cumulus Potential can predict puffy cloud formation when the BL Cloud Cover is zero or vice versa."
			},
			{
				"rasp_id": "cape",
				"text": "CAPE",
				"description": "Convective Available Potential Energy indicates the atmospheric stability affecting deep convective cloud formation above the BL.  A higher value indicates greater potential instability, larger updraft velocities within deep convective clouds, and greater potential for thunderstorm development (since a trigger is needed to release that potential).  Note that thunderstorms may develop in regions of high CAPE and then get transported downwind to regions of lower CAPE.  Also, locations where both convergence and CAPE values are high can be subject to explosive thunderstorm development"
			},
			{
				"rasp_id": "rain3",
				"text": "Rainfall",
				"description": "Rainfall accumulated over past 3 hours."
			}
		]
	},
	{
		text: "Wave / upper level Parameters",
		items: [
			{
				"rasp_id": "press850",
				"text": "Vertical Velocity at 850mb",
				"description": "Vertical velocity at a constant pressure level, plus wind speed/direction barbs.  [850/700/500mb presure levels are approximately at 5000/8000/19000 ftMSL or 1500/2500/5800 mMSL.]  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "press700",
				"text": "Vertical Velocity at 700mb",
				"description": "Vertical velocity at a constant pressure level, plus wind speed/direction barbs.  [850/700/500mb presure levels are approximately at 5000/8000/19000 ftMSL or 1500/2500/5800 mMSL.]  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "press500",
				"text": "Vertical Velocity at 500mb",
				"description": "Vertical velocity at a constant pressure level, plus wind speed/direction barbs.  [850/700/500mb presure levels are approximately at 5000/8000/19000 ftMSL or 1500/2500/5800 mMSL.]  Such upward motions can result from mountain wave or BL convergence.  A white dashed straight-line represents the location of the slice used for the [Vertical Velocity Slice through Vertical Velocity Maximum] parameter since these parameters are intended to be used in conjunction.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"
			},
			{
				"rasp_id": "boxwmax",
				"text": "Vert.Velocity Slice at Vert.Vel.Max",
				"description": "A vertical slice depicting vertical velocity (colors) and potential temperature (lines), intended to help analyze occurrences of strong upward motion.  The slice is taken through the location of the maximum vertical velocity found at a height of approximately 5000 ftAGL over a domain which excludes the outer edge of the domain (the value of that maximum and its location is given in a subtitle of the plot).  The slice parallells the wind direction at that height and is depicted by a white dashed line on the [Vertical Velocity at 850/700/500mb] paramter plots (with left-right on the slice always being left-right on the plan view).  Mt. wave predictions are best made using resultions no larger than 4km, since a coarser grid generally does not resolve the waves accurately.  Mountain waves tend to occur above the surface and tilt upwind with height, whereas BL convergences are surface-based and vertically oriented.  These parameters are obtained directly from WRF model output and not from a BLIPMAP computation"
			}
		]
	}
];
