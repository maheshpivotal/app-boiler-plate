import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, Avatar, Button, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { COLORS, SPACING } from '../../constants';
import { MainScreenProps } from '../../navigation/navigationUtils';
import { AppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/slices/authSlice';

type AccountScreenProps = MainScreenProps<'Account'>;

const AccountScreen: React.FC<AccountScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth?.user);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Coming Soon', 'Profile editing will be implemented');
  };

  const handleChangePassword = () => {
    Alert.alert('Coming Soon', 'Change password will be implemented');
  };

  const handleNotificationSettings = () => {
    Alert.alert('Coming Soon', 'Notification settings will be implemented');
  };

  const handlePrivacySettings = () => {
    Alert.alert('Coming Soon', 'Privacy settings will be implemented');
  };

  const handleSupport = () => {
    Alert.alert('Coming Soon', 'Support will be implemented');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Coming Soon', 'Account deletion will be implemented'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Avatar.Text 
          size={80} 
          label={user ? `${user.firstName[0]}${user.lastName[0]}` : 'U'} 
          style={styles.avatar}
        />
        <Text style={styles.userName}>
          {user ? `${user.firstName} ${user.lastName}` : 'User Name'}
        </Text>
        <Text style={styles.userEmail}>
          {user?.email || 'user@example.com'}
        </Text>
        <Button 
          mode="outlined" 
          onPress={handleEditProfile}
          style={styles.editButton}
          labelStyle={styles.editButtonText}
        >
          Edit Profile
        </Button>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <List.Item
          title="Change Password"
          description="Update your password"
          left={(props) => <List.Icon {...props} icon="lock" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleChangePassword}
          style={styles.listItem}
        />
        
        <Divider />
        
        <List.Item
          title="Notification Settings"
          description="Manage your notifications"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleNotificationSettings}
          style={styles.listItem}
        />
        
        <Divider />
        
        <List.Item
          title="Privacy Settings"
          description="Control your privacy preferences"
          left={(props) => <List.Icon {...props} icon="shield-account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handlePrivacySettings}
          style={styles.listItem}
        />
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <List.Item
          title="Help & Support"
          description="Get help or contact us"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleSupport}
          style={styles.listItem}
        />
        
        <Divider />
        
        <List.Item
          title="About"
          description="App version and information"
          left={(props) => <List.Icon {...props} icon="information" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => Alert.alert('MobApp v1.0.0', 'Built with Expo and React Native')}
          style={styles.listItem}
        />
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>
        
        <List.Item
          title="Logout"
          description="Sign out of your account"
          left={(props) => <List.Icon {...props} icon="logout" color={COLORS.error} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleLogout}
          style={styles.listItem}
          titleStyle={styles.dangerText}
        />
        
        {/* <Divider /> */}
        
        {/* <List.Item
          title="Delete Account"
          description="Permanently delete your account"
          left={(props) => <List.Icon {...props} icon="delete" color={COLORS.error} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleDeleteAccount}
          style={styles.listItem}
          titleStyle={styles.dangerText}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  profileSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  editButton: {
    borderColor: COLORS.primary,
  },
  editButtonText: {
    color: COLORS.primary,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  listItem: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  dangerText: {
    color: COLORS.error,
  },
});

export default AccountScreen;
