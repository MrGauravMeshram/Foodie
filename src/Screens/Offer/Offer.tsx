import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../Hooks/useTheme';
import { useThemeStyles } from '../../Hooks/useThemeStyles';
import { Fonts, fontsSize } from '../../Theme/fonts';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';


import {
    OngoingOrdersData,
    HistoryOrdersData,
    OrderItem,
} from '../../Data/MyOrdersData';
import OrderItemCard from '../../Components/OrderItemCard';

const OfferScreen = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();
    const styles = useThemeStyles(getStyles);

    const [activeTab, setActiveTab] = useState<'Ongoing' | 'History'>('Ongoing');
    const [ongoingOrders, setOngoingOrders] = useState<OrderItem[]>(OngoingOrdersData);
    const [historyOrders, setHistoryOrders] = useState<OrderItem[]>(HistoryOrdersData);


    const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['65%'], []);

    const currentData = useMemo(() => {
        return activeTab === 'Ongoing' ? ongoingOrders : historyOrders;
    }, [activeTab, ongoingOrders, historyOrders]);

    const handleCancelOrder = (item: OrderItem) => {
        Alert.alert(
            'Cancel Order',
            `Are you sure you want to cancel your order from ${item.restaurant}?`,
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes, Cancel',
                    style: 'destructive',
                    onPress: () => {

                        setOngoingOrders((prev) => prev.filter((order) => order.id !== item.id));


                        const cancelledItem: OrderItem = {
                            ...item,
                            id: `history-${Date.now()}`,
                            status: 'Cancelled',
                            date: 'Today',
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        };
                        setHistoryOrders((prev) => [cancelledItem, ...prev]);

                        Toast.show({
                            type: 'success',
                            text1: 'Order Cancelled',
                            text2: `Your order from ${item.restaurant} was cancelled.`,
                        });
                    },
                },
            ]
        );
    };


    const handleTrackOrder = (item: OrderItem) => {
        setSelectedOrder(item);
        bottomSheetRef.current?.expand();
    };


    const handleReorder = (item: OrderItem) => {

        const reorderedItem: OrderItem = {
            ...item,
            id: `ongoing-${Date.now()}`,
            status: 'Preparing',
            estimatedTime: '20 mins',
            orderNo: `#${Math.floor(100000 + Math.random() * 900000)}`,
        };

        setOngoingOrders((prev) => [reorderedItem, ...prev]);

        Toast.show({
            type: 'success',
            text1: 'Reordered Successfully',
            text2: `New order created for ${item.restaurant}!`,
        });
    };

    const getStepStatus = (stepName: string, orderStatus: string) => {
        const statuses = ['Accepted', 'Preparing', 'On the Way', 'Completed'];
        const currentIdx = statuses.indexOf(orderStatus);
        const stepIdx = statuses.indexOf(stepName);

        if (currentIdx > stepIdx) {
            return 'completed';
        } else if (currentIdx === stepIdx) {
            return 'active';
        } else {
            return 'upcoming';
        }
    };


    const trackingSteps = [
        {
            name: 'Accepted',
            title: 'Order Confirmed',
            description: 'Your order has been received and confirmed.',
        },
        {
            name: 'Preparing',
            title: 'Preparing Food',
            description: 'The kitchen is preparing your delicious meal.',
        },
        {
            name: 'On the Way',
            title: 'On the Way',
            description: 'Our delivery agent is heading to your location.',
        },
        {
            name: 'Completed',
            title: 'Delivered',
            description: 'Order successfully delivered to your doorstep.',
        },
    ];

    const renderItem = ({ item }: { item: OrderItem }) => {
        return (
            <View style={styles.cardWrapper}>
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionHeaderText}>{item.category}</Text>
                    <View style={styles.sectionHeaderLine} />
                </View>
                <OrderItemCard
                    item={item}
                    activeTab={activeTab}
                    onTrackOrder={handleTrackOrder}
                    onCancelOrder={handleCancelOrder}
                    onReorder={handleReorder}
                />
            </View>
        );
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={22} color={colors.black} />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>My Orders</Text>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
                    <Feather name="more-horizontal" size={22} color={colors.black} />
                </TouchableOpacity>
            </View>


            <View style={styles.tabsContainer}>
                <View style={styles.tabsRow}>
                    <TouchableOpacity
                        style={styles.tabButton}
                        onPress={() => setActiveTab('Ongoing')}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'Ongoing' ? styles.activeTabText : styles.inactiveTabText,
                            ]}
                        >
                            Ongoing
                        </Text>
                        {activeTab === 'Ongoing' && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabButton}
                        onPress={() => setActiveTab('History')}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'History' ? styles.activeTabText : styles.inactiveTabText,
                            ]}
                        >
                            History
                        </Text>
                        {activeTab === 'History' && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.tabsUnderline} />
            </View>


            <FlatList
                data={currentData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Feather name="shopping-bag" size={60} color={colors.lightGrey} />
                        <Text style={styles.emptyText}>No {activeTab.toLowerCase()} orders found</Text>
                    </View>
                }
            />


            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: colors.white }}
                handleIndicatorStyle={{ backgroundColor: colors.sideBarIcon }}
            >
                <BottomSheetView style={styles.sheetContent}>
                    {selectedOrder && (
                        <>
                            <Text style={styles.modalTitle}>Track Order</Text>

                            <View style={styles.modalHeaderRow}>
                                <View>
                                    <Text style={styles.modalRestName}>{selectedOrder.restaurant}</Text>
                                    <Text style={styles.modalOrderNo}>{selectedOrder.orderNo}</Text>
                                </View>
                                {selectedOrder.estimatedTime && (
                                    <View style={styles.estTimeContainer}>
                                        <Text style={styles.estTimeLabel}>EST. TIME</Text>
                                        <Text style={styles.estTimeValue}>{selectedOrder.estimatedTime}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.timelineContainer}>
                                {trackingSteps.map((step, idx) => {
                                    const stepStatus = getStepStatus(step.name, selectedOrder.status);
                                    return (
                                        <View key={step.name} style={styles.timelineRow}>

                                            <View style={styles.timelineLeft}>
                                                <View
                                                    style={[
                                                        styles.timelineNode,
                                                        stepStatus === 'completed' && styles.nodeCompleted,
                                                        stepStatus === 'active' && styles.nodeActive,
                                                    ]}
                                                >
                                                    {stepStatus === 'completed' ? (
                                                        <Feather name="check" size={12} color={colors.white} />
                                                    ) : stepStatus === 'active' ? (
                                                        <View style={styles.nodeActiveInner} />
                                                    ) : null}
                                                </View>
                                                {idx !== trackingSteps.length - 1 && (
                                                    <View
                                                        style={[
                                                            styles.timelineLine,
                                                            stepStatus === 'completed' && styles.lineCompleted,
                                                        ]}
                                                    />
                                                )}
                                            </View>

                                            <View style={styles.timelineRight}>
                                                <Text
                                                    style={[
                                                        styles.stepTitle,
                                                        stepStatus === 'upcoming' && styles.textUpcoming,
                                                        stepStatus === 'active' && styles.textActive,
                                                    ]}
                                                >
                                                    {step.title}
                                                </Text>
                                                <Text style={styles.stepDesc}>{step.description}</Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>


                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => bottomSheetRef.current?.close()}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.closeButtonText}>Done</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
    );
};

const getStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
        },
        header: {
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        iconButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.sideBarIcon,
            alignItems: 'center',
            justifyContent: 'center',
        },
        screenTitle: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.smd,
            color: colors.black,
        },
        tabsContainer: {
            position: 'relative',
            marginBottom: 20,
        },
        tabsRow: {
            flexDirection: 'row',
            marginHorizontal: 24,
            zIndex: 2,
        },
        tabButton: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: 14,
            position: 'relative',
        },
        tabText: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.sm,
        },
        activeTabText: {
            color: colors.btnColor,
        },
        inactiveTabText: {
            color: colors.lightGrey,
        },
        tabIndicator: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: colors.btnColor,
            borderRadius: 3,
        },
        tabsUnderline: {
            position: 'absolute',
            bottom: 0,
            left: 24,
            right: 24,
            height: 1,
            backgroundColor: colors.sideBarIcon,
            zIndex: 1,
        },
        listContent: {
            paddingHorizontal: 24,
            paddingBottom: 120, // Pad for bottom navigation bar safety
        },
        cardWrapper: {
            marginBottom: 8,
        },
        sectionHeaderRow: {
            marginBottom: 8,
        },
        sectionHeaderText: {
            fontFamily: Fonts.senRegular,
            fontSize: fontsSize.sm,
            color: colors.black,
            marginBottom: 6,
        },
        sectionHeaderLine: {
            height: 1,
            backgroundColor: colors.sideBarIcon,
        },
        emptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 80,
        },
        emptyText: {
            marginTop: 16,
            fontFamily: Fonts.senMedium,
            fontSize: fontsSize.sm,
            color: colors.lightGrey,
        },
        // Sheet Styles
        sheetContent: {
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 16,
        },
        modalTitle: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.md,
            color: colors.black,
            textAlign: 'center',
            marginBottom: 24,
        },
        modalHeaderRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30,
            backgroundColor: colors.sideBarIcon,
            padding: 16,
            borderRadius: 16,
        },
        modalRestName: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.sm + 2,
            color: colors.black,
            marginBottom: 4,
        },
        modalOrderNo: {
            fontFamily: Fonts.senRegular,
            fontSize: fontsSize.exsm,
            color: colors.lightGrey,
        },
        estTimeContainer: {
            alignItems: 'flex-end',
        },
        estTimeLabel: {
            fontFamily: Fonts.senRegular,
            fontSize: fontsSize.exsm,
            color: colors.lightGrey,
            marginBottom: 2,
        },
        estTimeValue: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.sm + 2,
            color: colors.btnColor,
        },
        timelineContainer: {
            paddingHorizontal: 8,
            marginBottom: 32,
        },
        timelineRow: {
            flexDirection: 'row',
            minHeight: 64,
        },
        timelineLeft: {
            alignItems: 'center',
            width: 28,
            marginRight: 16,
        },
        timelineNode: {
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: colors.lightGrey,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
        },
        nodeCompleted: {
            backgroundColor: colors.success,
            borderColor: colors.success,
        },
        nodeActive: {
            borderColor: colors.btnColor,
            backgroundColor: colors.white,
        },
        nodeActiveInner: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.btnColor,
        },
        timelineLine: {
            width: 2,
            flex: 1,
            backgroundColor: colors.sideBarIcon,
            position: 'absolute',
            top: 24,
            bottom: -12,
            zIndex: 1,
        },
        lineCompleted: {
            backgroundColor: colors.success,
        },
        timelineRight: {
            flex: 1,
            paddingTop: 2,
        },
        stepTitle: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.sm,
            color: colors.black,
            marginBottom: 4,
        },
        textUpcoming: {
            color: colors.lightGrey,
        },
        textActive: {
            color: colors.btnColor,
        },
        stepDesc: {
            fontFamily: Fonts.senRegular,
            fontSize: fontsSize.exsm,
            color: colors.lightGrey,
            lineHeight: 16,
        },
        closeButton: {
            backgroundColor: colors.btnColor,
            borderRadius: 12,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
        },
        closeButtonText: {
            fontFamily: Fonts.senBold,
            fontSize: fontsSize.sm + 2,
            color: colors.white,
        },
    });

export default OfferScreen;
